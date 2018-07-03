#include "hid_global_reader.h"

#include "delay.h"

#include "soc/timer_group_struct.h"
#include "driver/timer.h"

#include "esp_log.h"

#include <unordered_map>

typedef void (*TimerCallbackFunction)(void*);

//  Hardware timer clock divider
static constexpr auto TIMER_DIVIDER = 16;
static constexpr timer_idx_t BEEP_TIMER_IDX = static_cast<timer_idx_t>(0);
static constexpr timer_idx_t HOLD_TIMER_IDX = static_cast<timer_idx_t>(1);

void beep_timer_isr(void* userdata) IRAM_ATTR;
void hold_timer_isr(void* userdata) IRAM_ATTR;

HIDGlobalReader::HIDGlobalReader(const WiegandReader::Config& config) noexcept
: WiegandReader(config)
{
  set_beeper(0);

  // Configure one of the hardware timer groups, two separate timers on it
  timer_config_t timer_config = {
    alarm_en: TIMER_ALARM_EN,
    counter_en: TIMER_PAUSE,
    intr_type: TIMER_INTR_LEVEL,
    counter_dir: TIMER_COUNT_UP,
    auto_reload: 1,
    divider: TIMER_DIVIDER,
  };

  auto timer_idxs = std::unordered_map<int, TimerCallbackFunction>{
    { BEEP_TIMER_IDX, beep_timer_isr },
    { HOLD_TIMER_IDX, hold_timer_isr }
  };
  for (const auto& timer_callback : timer_idxs)
  {
    const auto timer_idx = static_cast<timer_idx_t>(timer_callback.first);
    const auto& timer_isr = timer_callback.second;
    timer_init(TIMER_GROUP_0, timer_idx, &timer_config);

    // Set the desired auto-reload value to 0
    timer_set_counter_value(TIMER_GROUP_0, timer_idx, 0ULL);

    // Enable timer interrupts and schedule an ISR
    timer_enable_intr(TIMER_GROUP_0, timer_idx);

    timer_isr_register(
      TIMER_GROUP_0,
      timer_idx,
      timer_isr,
      this,
      0,
      nullptr
    );
  }

  // Set the initial hold timer to expire immediately
  timer_set_alarm_value(TIMER_GROUP_0, HOLD_TIMER_IDX, 1ULL);

  // Start the hold timer loop
  timer_start(TIMER_GROUP_0, HOLD_TIMER_IDX);
}

auto IRAM_ATTR HIDGlobalReader::scanning_fsm()
  -> void
{
  uint64_t alarm_value = 0;

  switch (scan_state)
  {
    case ScanState::IsScanningHold:
    {
      // Turn off the hold (re-enable reads), then wait 250ms before reading
      set_hold(0);
      scan_state = ScanState::IsScanningTag;
      alarm_value = (
        500 // from millis
        * (TIMER_BASE_CLK / TIMER_DIVIDER / 1000) // to seconds
      );
      break;
    }

    case ScanState::IsScanningTag:
    {
      // Read the tag
      scan_state = ScanState::IsScanningComplete;
      last_scanned_tag = scan_tag();
      // fallthrough:
    }

    case ScanState::IsScanningComplete:
    {
      // Run for N seconds with hold enabled (reading disabled)
      set_hold(1);
      scan_state = ScanState::IsScanningHold;
      alarm_value = (
        1000 // from millis
        * (TIMER_BASE_CLK / TIMER_DIVIDER / 1000) // to seconds
      );
      break;
    }
  }

  if (alarm_value)
  {
    // Reset the timer
    // timer_set_alarm_value
    TIMERG0.hw_timer[HOLD_TIMER_IDX].alarm_high = (uint32_t)(alarm_value >> 32);
    TIMERG0.hw_timer[HOLD_TIMER_IDX].alarm_low = (uint32_t)(alarm_value);

    // timer_start
    TIMERG0.hw_timer[HOLD_TIMER_IDX].config.enable = 1;
  }
}

auto IRAM_ATTR HIDGlobalReader::scan_tag()
  -> MaybeTagId
{
  auto current_tag = get_current_tag();
  if (current_tag and current_tag->tag_id)
  {
    auto hid_global_tag_id = HIDGlobalTagID{current_tag->tag_id};

    if (hid_global_tag_id.valid)
    {
      return hid_global_tag_id;
    }
  }

  return std::experimental::nullopt;
}

auto HIDGlobalReader::beep(TimeDuration duration)
  -> void
{
  // Reset the timer
  uint64_t beep_duration = (
    get_interval_microseconds(duration)
    * TIMER_BASE_CLK / TIMER_DIVIDER
    / (1000 * 1000)
  );

  // timer_set_alarm_value
  TIMERG0.hw_timer[BEEP_TIMER_IDX].alarm_high = (uint32_t) (beep_duration >> 32);
  TIMERG0.hw_timer[BEEP_TIMER_IDX].alarm_low = (uint32_t) beep_duration;

  // Start beeping now
  set_beeper(1);

  // Start the timer, which will stop beeping when fired
  // timer_start
  TIMERG0.hw_timer[BEEP_TIMER_IDX].config.enable = 1;
}

void IRAM_ATTR beep_timer_isr(void* userdata)
{
  // Clear the interrupt status flag
  TIMERG0.int_clr_timers.t0 = 1;

  // Re-enable the alarm for next time
  TIMERG0.hw_timer[BEEP_TIMER_IDX].config.alarm_en = TIMER_ALARM_EN;
  TIMERG0.hw_timer[BEEP_TIMER_IDX].config.enable = 0;

  if (userdata)
  {
    auto reader = static_cast<WiegandReader*>(userdata);
    reader->set_beeper(0);
  }
}

void IRAM_ATTR hold_timer_isr(void* userdata)
{
  // Clear the interrupt status flag
  TIMERG0.int_clr_timers.t1 = 1;

  // Re-enable the alarm for next time
  TIMERG0.hw_timer[HOLD_TIMER_IDX].config.alarm_en = TIMER_ALARM_EN;
  TIMERG0.hw_timer[HOLD_TIMER_IDX].config.enable = 0;

  if (userdata)
  {
    auto reader = static_cast<HIDGlobalReader*>(userdata);
    reader->scanning_fsm();
  }
}
