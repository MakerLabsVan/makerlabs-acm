#include "actors.h"

#include "display_generated.h"

#include "u8g2_esp32_hal.h"

#include "delay.h"
#include "timestamp.h"

#include <chrono>

#include "esp_log.h"

using namespace ActorModel;
using namespace Display;

using namespace std::chrono_literals;

constexpr char TAG[] = "display_actor";

struct DisplayActorState
{
  DisplayActorState()
  {
    // Configure hardware ESP32-specific HAL settings
    u8g2_esp32_hal = U8G2_ESP32_HAL_DEFAULT;
    u8g2_esp32_hal.sda = pin_sda;
    u8g2_esp32_hal.scl = pin_scl;
    u8g2_esp32_hal.reset = pin_reset;

    // Initialize the ESP32-specific HAL hardware
    u8g2_esp32_hal_init(u8g2_esp32_hal);

    // Initialize u8g2 structure
    u8g2_Setup_ssd1306_128x32_univision_f(
      &u8g2,
      U8G2_R0,
      u8g2_esp32_msg_i2c_cb,
      u8g2_esp32_msg_i2c_and_delay_cb
    );

    // Set the I2C slave address
    u8x8_SetI2CAddress(&u8g2.u8x8, 0x78);

   // Send init sequence to the display -- display is in sleep mode after this.
    u8g2_InitDisplay(&u8g2);

    // Wake up display
    u8g2_SetPowerSave(&u8g2, 0);

    // Send an initial blank frame
    u8g2_ClearBuffer(&u8g2);

    // Send the buffer to the display
    u8g2_SendBuffer(&u8g2);
  }

  auto update_display_action(const DisplayAction display_action)
    -> bool
  {
    // Reset progress bar
    progress_bar_start = 0s;
    progress_bar_duration = 0s;

    if (display_action != last_display_action)
    {
      // Clear the buffer
      u8g2_ClearBuffer(&u8g2);
    }

    last_progress_bar_message.clear();
    last_idle_time = get_elapsed_microseconds();
    last_display_action = display_action;

    return true;
  }

  TimeDuration progress_bar_start = 0s;
  TimeDuration progress_bar_duration = 0s;

  TimeDuration job_timer_start = 0s;

  TimeDuration last_idle_time = 0s;
  TimeDuration idle_timeout = 2min;

  uint32_t initial_progress = 0;
  DisplayAction last_display_action = DisplayAction::NONE;
  std::string last_progress_bar_message;

  u8g2_esp32_hal_t u8g2_esp32_hal;
  gpio_num_t pin_sda = static_cast<gpio_num_t>(4);
  gpio_num_t pin_scl = static_cast<gpio_num_t>(15);
  gpio_num_t pin_reset = static_cast<gpio_num_t>(16);
  u8g2_t u8g2;
};

auto display_behaviour(const Pid& self, Mailbox& mailbox)
  -> ResultUnion
{
  DisplayActorState state;

  const auto display_rate = 100ms;

  for (;;)
  {
    const auto received_message = mailbox.receive();
    if (received_message)
    {
      const auto message_ref = received_message->ref();
      const auto* _message = flatbuffers::GetRoot<Message>(message_ref.data());
      if (_message)
      {
        const auto& message = *(_message);

        {
          if (matches(message, "ClearDisplay"))
          {
            // Clear the buffer
            u8g2_ClearBuffer(&state.u8g2);

            // Send the buffer to the display
            u8g2_SendBuffer(&state.u8g2);

            continue;
          }
        }

        {
          const DisplayIntent* display_intent = nullptr;
          if (matches(message, "ShowUserDetails", display_intent))
          {
            if (display_intent->display_type() == DisplayAction::ShowUserDetails)
            {
              state.update_display_action(display_intent->display_type());

              const auto* user_details = (
                display_intent->display_as_ShowUserDetails()
              );

              if (user_details)
              {
                const auto& line1 = user_details->name();
                const auto& line2 = user_details->makerlabs_id();

                // Draw line1: Full Name
                if (line1)
                {
                  printf("%s\n", line1->c_str());
                  u8g2_SetFont(&state.u8g2, u8g2_font_helvR10_tr);
                  u8g2_DrawStr(&state.u8g2, 0, 13, line1->c_str());
                }

                // Draw line2: 1.2s
                if (line2)
                {
                  printf("%s\n", line2->c_str());
                  u8g2_SetFont(&state.u8g2, u8g2_font_helvB14_tr);
                  u8g2_DrawStr(&state.u8g2, 0, 31, line2->c_str());
                }

                // Send the buffer to the display
                u8g2_SendBuffer(&state.u8g2);
              }

              continue;
            }
          }
        }

        {
          const DisplayIntent* display_intent = nullptr;
          if (matches(message, "ProgressBar", display_intent))
          {
            if (display_intent->display_type() == DisplayAction::ProgressBar)
            {
              state.update_display_action(display_intent->display_type());

              const auto* progress_bar = (
                display_intent->display_as_ProgressBar()
              );

              if (progress_bar)
              {
                state.progress_bar_start = get_elapsed_microseconds();
                state.progress_bar_duration = std::chrono::microseconds(
                  progress_bar->duration_microseconds()
                );

                const auto& message = progress_bar->message();
                state.initial_progress = progress_bar->progress();
                auto icon = progress_bar->icon();

                if (state.last_progress_bar_message != message->string_view())
                {
                  // Clear the buffer
                  u8g2_ClearBuffer(&state.u8g2);
                }

                // Draw status line
                if (message and message->size() > 0)
                {
                  printf("%s: %d%%\n", message->c_str(), state.initial_progress);

                  u8g2_SetFont(&state.u8g2, u8g2_font_helvR10_tr);
                  u8g2_DrawStr(&state.u8g2, 0, 13, message->c_str());
                }


                // Draw progress bar
                auto w = u8g2_GetDisplayWidth(&state.u8g2);
                auto h = u8g2_GetDisplayHeight(&state.u8g2);
                auto pad = 3;
                auto bar_w = (w - (2*pad)) * state.initial_progress / 100;

                u8g2_DrawFrame(&state.u8g2, 0, (h/2) + 1, w, (h/2) - 2);
                u8g2_DrawBox(&state.u8g2, pad, (h/2) + pad, bar_w, (h/2) - (2*pad));

                // Draw an icon at the bottom right of the progress bar
                if (icon != Icon::None)
                {
                  auto icon = static_cast<std::underlying_type<Icon>::type>(
                    Icon::HeavyCheckmark
                  );

                  // Use the symbols font
                  u8g2_SetFont(&state.u8g2, u8g2_font_unifont_t_symbols);

                  // If the (white) progress bar will be covering 50% of the icon
                  if (bar_w > (w - 10))
                  {
                    // Set draw color to black
                    u8g2_SetDrawColor(&state.u8g2, 0);
                  }

                  // Draw glyph in bottom-right corner of progress bar
                  u8g2_DrawGlyph(&state.u8g2, w - 20, h - pad, icon);

                  // Restore draw color to white
                  u8g2_SetDrawColor(&state.u8g2, 1);
                }

                // Send the buffer to the display
                u8g2_SendBuffer(&state.u8g2);

                state.last_progress_bar_message = message->str();
              }

              continue;
            }
          }
        }

        {
          if (matches(message, "BeginJobTimer"))
          {

            state.job_timer_start = get_elapsed_microseconds();

            continue;
          }
        }

        {
          if (matches(message, "StopJobTimer"))
          {

            state.job_timer_start = 0s;

            continue;
          }
        }
      }
    }

    const auto elapsed_microseconds = get_elapsed_microseconds();

    // Check for ProgressBar
    if (
      state.progress_bar_start > 0s
      and elapsed_microseconds >= state.progress_bar_start
    )
    {
      auto progress = state.initial_progress;
      auto progress_bar_end = (
        state.progress_bar_start + state.progress_bar_duration
      );

      // Check if the timer is in-progress (somewhere in the middle)
      if (elapsed_microseconds < progress_bar_end)
      {
        float amt = (
          (get_interval_microseconds(elapsed_microseconds)
           - get_interval_microseconds(state.progress_bar_start)
          )
          / (float)(get_interval_microseconds(state.progress_bar_duration))
        );
        progress += (amt * (100 - state.initial_progress));
      }
      // The timer is now finished
      else {
        progress = 100;

        // Reset progress bar in-progress status
        state.progress_bar_start = 0s;
        state.progress_bar_duration = 0s;
      }

      // Draw progress bar
      auto w = u8g2_GetDisplayWidth(&state.u8g2);
      auto h = u8g2_GetDisplayHeight(&state.u8g2);
      auto pad = 3;
      auto bar_w = (w - (2*pad)) * progress / 100;

      u8g2_DrawBox(&state.u8g2, pad, (h/2) + pad, bar_w, (h/2) - (2*pad));

      // Send the buffer to the display
      u8g2_SendBuffer(&state.u8g2);
    }

    // Check for JobTimer, that has been started but not stopped
    else if (
      state.job_timer_start > 0s
      and elapsed_microseconds >= state.job_timer_start
    )
    {
      const auto seconds = get_interval_microseconds(
        elapsed_microseconds - state.job_timer_start
      ) / 1000000.0;

      // Blank line2
      auto w = u8g2_GetDisplayWidth(&state.u8g2);
      auto h = u8g2_GetDisplayHeight(&state.u8g2);
      // Set draw color to black
      u8g2_SetDrawColor(&state.u8g2, 0);

      auto font_size = 14;
      u8g2_DrawBox(&state.u8g2, 0, (31 - font_size), w, (h - (31 - font_size)));

      // Restore draw color to white
      u8g2_SetDrawColor(&state.u8g2, 1);

      // Draw line2: 1.2s
      char seconds_buf[5] = {0};
      snprintf(seconds_buf, sizeof(seconds_buf), "%1.1fs", seconds);
      u8g2_SetFont(&state.u8g2, u8g2_font_helvB14_tr);
      u8g2_DrawStr(&state.u8g2, 0, 31, seconds_buf);

      // Send the buffer to the display
      u8g2_SendBuffer(&state.u8g2);
    }

    // Blank the display if no activity for a certain time
    else if (
      state.last_idle_time != 0s
      and elapsed_microseconds >= (state.last_idle_time + state.idle_timeout)
      and state.last_display_action != DisplayAction::ShowUserDetails
      and state.last_display_action != DisplayAction::BeginJobTimer
      and state.last_display_action != DisplayAction::UpdateJobTimer
    )
    {
      send(self, "ClearDisplay");
      state.last_idle_time = 0s;
    }

    // Start a timer to blank the display
    else if (state.last_idle_time == 0s)
    {
      state.last_idle_time = elapsed_microseconds;
    }

    delay(display_rate);
  }

  return {Result::Unhandled};
}
