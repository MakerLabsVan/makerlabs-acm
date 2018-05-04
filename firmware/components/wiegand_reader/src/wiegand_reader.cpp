#include "wiegand_reader.h"

//#include "freertos/FreeRTOS.h"
#include "driver/gpio.h"

#include "esp_log.h"

using namespace std::chrono_literals;

constexpr static auto max_bit_interval = 100ms;
constexpr static auto max_tag_active_interval = 2s;

static void IRAM_ATTR
wiegand_gpio_isr_handler(void* arg)
{
  if (arg)
  {
    auto callback_info = static_cast<WiegandReader::CallbackInfo*>(arg);

    auto& state = callback_info->state;
    auto& bit = state.current_bit;
    auto& tag_bits = state.current_tag_bits;
    auto& last_timestamp = state.last_bit_timestamp;

    auto now = std::chrono::system_clock::now();

    // Reset the count if this is a new tag read
    if ((now - last_timestamp) > max_bit_interval)
    {
      tag_bits.reset();
      bit = 0;
    }

    // Check for overflow, this should not happen
    if (bit >= tag_bits.size())
    {
      tag_bits.reset();
      bit = 0;

      ESP_EARLY_LOGE("WiegandISR", "Too many bits read!");
    }
    else {
      // Reset the previous value if this is the first bit
      if (bit == 0)
      {
        tag_bits.reset();
      }

      unsigned long bit_value = !!callback_info->is_data1;
      tag_bits.set(bit, bit_value);

      bit++;
    }

    // Update last bit timestamp
    last_timestamp = now;
  }
}

WiegandReader::WiegandReader(const WiegandReader::Config& _config)
: config(_config)
, data0_callback{state,0}
, data1_callback{state,1}
{
  gpio_config_t _gpio_config;

  // Setup GPIO outputs (Green LED, Red LED, beeper)
  // Disable pin interrupts
  _gpio_config.intr_type = static_cast<gpio_int_type_t>(GPIO_PIN_INTR_DISABLE);
  // Set as output type
  _gpio_config.mode = static_cast<gpio_mode_t>(GPIO_MODE_OUTPUT);
  // Enable pull-up mode
  _gpio_config.pull_down_en = static_cast<gpio_pulldown_t>(false);
  _gpio_config.pull_up_en = static_cast<gpio_pullup_t>(true);
  // Configure all output pins with above options at once
  _gpio_config.pin_bit_mask = (
    (1ULL << config.hold_pin)
    | (1ULL << config.red_led_pin)
    | (1ULL << config.green_led_pin)
    | (1ULL << config.beeper_pin)
  );

  // Configure GPIO outputs
  gpio_config(&_gpio_config);

  // Setup GPIO inputs (data0 / data1)
  // Enable interrupts on falling edge
  _gpio_config.intr_type = static_cast<gpio_int_type_t>(GPIO_PIN_INTR_NEGEDGE);
  // Set as input type
  _gpio_config.mode = GPIO_MODE_INPUT;
  // Disable pull-up / pull-down mode
  _gpio_config.pull_down_en = static_cast<gpio_pulldown_t>(false);
  _gpio_config.pull_up_en = static_cast<gpio_pullup_t>(false);
  // Configure all input pins with above options at once
  _gpio_config.pin_bit_mask = (
    (1ULL << config.data0_pin)
    | (1ULL << config.data1_pin)
  );

  // Configure GPIO inputs
  gpio_config(&_gpio_config);

  // Install GPIO input ISR service
  auto esp_intr_flag_default = 0;
  gpio_install_isr_service(esp_intr_flag_default);

  // Add ISR handlers
  gpio_isr_handler_add(
    static_cast<gpio_num_t>(config.data0_pin),
    wiegand_gpio_isr_handler,
    &data0_callback
  );
  gpio_isr_handler_add(
    static_cast<gpio_num_t>(config.data1_pin),
    wiegand_gpio_isr_handler,
    &data1_callback
  );
}

bool
WiegandReader::set_hold(bool enabled)
{
  return _set_output(config.hold_pin, enabled);
}

bool
WiegandReader::set_red_led(bool enabled)
{
  return _set_output(config.red_led_pin, enabled);
}

bool
WiegandReader::set_green_led(bool enabled)
{
  return _set_output(config.green_led_pin, enabled);
}

bool
WiegandReader::set_beeper(bool enabled)
{
  return _set_output(config.beeper_pin, enabled);
}

bool
WiegandReader::_set_output(int pin, bool enabled)
{
  if (pin > 0)
  {
    auto ret = gpio_set_level(static_cast<gpio_num_t>(pin), enabled? 0 : 1);
    return (ret == ESP_OK);
  }

  return false;
}

WiegandReader::TagReadEvent
WiegandReader::get_current_tag()
{
  WiegandReader::TagReadEvent current_tag_read;

  auto now = std::chrono::system_clock::now();
  if ((now - state.last_bit_timestamp) > max_tag_active_interval)
  {
    // Reset the current bit num to begin a new read
    state.current_bit = 0;
    state.current_tag_bits.reset();
  }

  // Capture the current tag id
  auto current_tag_id = state.current_tag_bits.to_ullong();
  if (current_tag_id)
  {
    auto timestamp = state.last_bit_timestamp;
    return WiegandReader::TagReadEvent{TagRead{current_tag_id, timestamp}};
  }

  return std::experimental::nullopt;
}
