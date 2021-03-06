#include "actors.h"

#include "requests.h"
#include "timestamp.h"

#include "acm_helpers.h"

#include "esp_log.h"

#include <chrono>
#include <experimental/string_view>
#include <string>

using namespace ActorModel;
using namespace Requests;

using namespace ACM;

using namespace std::chrono_literals;

using string = std::string;
using string_view = std::experimental::string_view;

constexpr char TAG[] = "machine_actor";

static void IRAM_ATTR
motors_gpio_isr_handler(void* arg);

struct MachineActorState
{
  MachineActorState(
    int _interlock_pin = 21,
    int _relay_pin = 25,
    int _motor_x_pin = 13,
    int _motor_y_pin = 14
  )
  : interlock_pin(_interlock_pin)
  , relay_pin(_relay_pin)
  , motor_x_pin(_motor_x_pin)
  , motor_y_pin(_motor_y_pin)
  {
    gpio_config_t _gpio_config;

    // Setup GPIO outputs (Interlock, Relay)
    // Disable pin interrupts
    _gpio_config.intr_type = static_cast<gpio_int_type_t>(GPIO_PIN_INTR_DISABLE);
    // Set as output type
    _gpio_config.mode = static_cast<gpio_mode_t>(GPIO_MODE_OUTPUT);

    // Interlock:
    // Enable pull-up mode
    _gpio_config.pull_down_en = static_cast<gpio_pulldown_t>(false);
    _gpio_config.pull_up_en = static_cast<gpio_pullup_t>(true);
    _gpio_config.pin_bit_mask = (
      (1ULL << static_cast<gpio_num_t>(interlock_pin))
    );
    // Configure interlock GPIO
    gpio_config(&_gpio_config);

    // Relay:
    _gpio_config.pull_down_en = static_cast<gpio_pulldown_t>(true);
    _gpio_config.pull_up_en = static_cast<gpio_pullup_t>(false);
    _gpio_config.pin_bit_mask = (
      (1ULL << static_cast<gpio_num_t>(relay_pin))
    );
    // Configure interlock GPIO
    gpio_config(&_gpio_config);

    // Setup GPIO inputs (MotorX, MotorY)
    // Enable interrupts on rising edge
    _gpio_config.intr_type = static_cast<gpio_int_type_t>(GPIO_PIN_INTR_POSEDGE);
    // Set as input type
    _gpio_config.mode = GPIO_MODE_INPUT;
    // Disable pull-up / pull-down mode
    _gpio_config.pull_down_en = static_cast<gpio_pulldown_t>(false);
    _gpio_config.pull_up_en = static_cast<gpio_pullup_t>(true);
    // Configure all input pins with above options at once
    _gpio_config.pin_bit_mask = (
      (1ULL << static_cast<gpio_num_t>(motor_x_pin))
      | (1ULL << static_cast<gpio_num_t>(motor_y_pin))
    );

    // Configure GPIO inputs
    gpio_config(&_gpio_config);

    // Install GPIO input ISR service
    auto esp_intr_flag_default = 0;
    gpio_install_isr_service(esp_intr_flag_default);

    // Add ISR handlers
    // X-axis
    gpio_isr_handler_add(
      static_cast<gpio_num_t>(motor_x_pin),
      motors_gpio_isr_handler,
      this
    );

    // Y-axis
    gpio_isr_handler_add(
      static_cast<gpio_num_t>(motor_y_pin),
      motors_gpio_isr_handler,
      this
    );
  }

  bool IRAM_ATTR
  _set_output(int pin, bool enabled)
  {
    if (pin > 0)
    {
      auto gpio_num = static_cast<gpio_num_t>(pin);
      // Invert logic (pull-down)
      auto level = enabled? 0 : 1;

      // gpio_set_level
      if (level)
      {
        if (gpio_num < 32)
          GPIO.out_w1ts = (1 << gpio_num);
        else
          GPIO.out1_w1ts.data = (1 << (gpio_num - 32));
      }
      else {
        if (gpio_num < 32)
          GPIO.out_w1tc = (1 << gpio_num);
        else
          GPIO.out1_w1tc.data = (1 << (gpio_num - 32));
      }

      return true;
    }

    return false;
  }

  int interlock_pin;
  int relay_pin;
  int motor_x_pin;
  int motor_y_pin;
  TimeDuration last_motor_pulse_timestamp = 0s;
  TimeDuration last_motor_activity_timestamp = 0s;
  int last_motor_pulse_count = 0;
  int motor_activity_seconds = 0;
  TimeDuration max_job_start_interval = 25s;
  TimeDuration max_job_end_interval = 5s;

  int max_motor_pulse_count = 1024;
  int threshold_motor_pulse_count = 5;

  TRef motor_activity_check_tref = NullTRef;
  TRef disable_interlock_tref = NullTRef;
  TRef disable_relay_tref = NullTRef;

  static constexpr bool RELAY_ON = true;
  static constexpr bool RELAY_OFF = false;
  static constexpr bool INTERLOCK_ON = false;
  static constexpr bool INTERLOCK_OFF = true;
};

static void IRAM_ATTR
motors_gpio_isr_handler(void* arg)
{
  if (arg)
  {
    auto* state = static_cast<MachineActorState*>(arg);
    auto& last_motor_pulse_timestamp = state->last_motor_pulse_timestamp;
    auto& last_motor_pulse_count = state->last_motor_pulse_count;
    const auto& max_motor_pulse_count = state->max_motor_pulse_count;

    auto now = get_elapsed_microseconds();

    // Update last motor timestamp
    last_motor_pulse_timestamp = now;
    if (last_motor_pulse_count < max_motor_pulse_count) {
      last_motor_pulse_count++;
    }
  }
}

auto machine_actor_behaviour(
  const Pid& self,
  StatePtr& _state,
  const Message& message
) -> ResultUnion
{
  if (not _state)
  {
    _state = std::make_shared<MachineActorState>();
  }
  auto& state = *(std::static_pointer_cast<MachineActorState>(_state));

  {
    if (matches(message, "enable"))
    {
      if (state.disable_interlock_tref)
      {
        cancel(state.disable_interlock_tref);
        state.disable_interlock_tref = NullTRef;
      }

      if (state.disable_relay_tref)
      {
        cancel(state.disable_relay_tref);
        state.disable_relay_tref = NullTRef;
      }

      // Start periodic motor activity check
      if (not state.motor_activity_check_tref)
      {
        state.motor_activity_check_tref = send_interval(
          1s,
          self,
          "motor_activity_check"
        );
      }

      // Enable machine immediately
      send(self, "enable_interlock");
      send(self, "enable_relay");
    }

    if (matches(message, "disable"))
    {
      // Disable interlock after some time (allow cancelling)
      if (not state.disable_interlock_tref)
      {
        state.disable_interlock_tref = send_after(
          5s,
          self,
          "disable_interlock"
        );
      }

      // Disable relay after some time (allow cancelling)
      if (not state.disable_relay_tref)
      {
        state.disable_relay_tref = send_after(
          15s,
          self,
          "disable_relay"
        );
      }

      // Disable periodic motor activity check
      if (state.motor_activity_check_tref)
      {
        cancel(state.motor_activity_check_tref);
        state.motor_activity_check_tref = NullTRef;
      }
    }
  }

  {
    if (matches(message, "motor_activity_check"))
    {
      auto now = get_elapsed_microseconds();
      bool motor_activity = (
        state.last_motor_pulse_count >= state.threshold_motor_pulse_count
      );
      auto elapsed_since_last_activity = (now - state.last_motor_activity_timestamp);
      auto max_job_start_seconds = std::chrono::duration_cast<std::chrono::seconds>(
        state.max_job_start_interval
      ).count();
      auto max_job_end_seconds = std::chrono::duration_cast<std::chrono::seconds>(
        state.max_job_end_interval
      ).count();

      if (motor_activity)
      {
        if (state.motor_activity_seconds == max_job_start_seconds)
        {
          printf("Begin job\n");

          auto display_actor_pid = *(whereis("display"));
          send(display_actor_pid, "BeginJobTimer");
        }

        state.motor_activity_seconds++;

        state.last_motor_activity_timestamp = now;
      }
      else if (
        (elapsed_since_last_activity > state.max_job_end_interval)
        and (state.motor_activity_seconds > 0)
      )
      {
        if (state.motor_activity_seconds > max_job_start_seconds)
        {
          flatbuffers::FlatBufferBuilder fbb;

          auto billable_seconds = (
            state.motor_activity_seconds
            - max_job_start_seconds
            + max_job_end_seconds
          );

          auto cnc_job_loc = CreateCNC_Job(fbb, billable_seconds);
          fbb.Finish(cnc_job_loc, ActivityIdentifier());

          printf("End job, usage seconds = %d\n", state.motor_activity_seconds);

          auto main_actor_pid = *(whereis("app"));
          send(main_actor_pid, "cnc_job", fbb.Release());

          auto display_actor_pid = *(whereis("display"));
          send(display_actor_pid, "StopJobTimer");
        }

        state.motor_activity_seconds = 0;
        state.last_motor_activity_timestamp = 0s;
      }

      state.last_motor_pulse_count = 0;
      return {Result::Ok};
    }
  }

  {
    if (matches(message, "enable_interlock"))
    {
      printf("Turn on interlock\n");
      state._set_output(state.interlock_pin, state.INTERLOCK_ON);
      return {Result::Ok};
    }
  }

  {
    if (matches(message, "disable_interlock"))
    {
      printf("Turn off interlock\n");
      state._set_output(state.interlock_pin, state.INTERLOCK_OFF);
      return {Result::Ok};
    }
  }

  {
    if (matches(message, "enable_relay"))
    {
      printf("Turn on relay\n");
      state._set_output(state.relay_pin, state.RELAY_ON);
      return {Result::Ok};
    }
  }

  {
    if (matches(message, "disable_relay"))
    {
      printf("Turn off relay\n");
      state._set_output(state.relay_pin, state.RELAY_OFF);
      return {Result::Ok};
    }
  }

  return {Result::Unhandled};
}
