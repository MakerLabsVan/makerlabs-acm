#include "actors.h"

#include "display_generated.h"

#include "u8g2_esp32_hal.h"

#include "esp_log.h"

using namespace ActorModel;
using namespace Display;

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

  u8g2_esp32_hal_t u8g2_esp32_hal;
  gpio_num_t pin_sda = static_cast<gpio_num_t>(4);
  gpio_num_t pin_scl = static_cast<gpio_num_t>(15);
  gpio_num_t pin_reset = static_cast<gpio_num_t>(16);
  u8g2_t u8g2;
};

auto display_actor_behaviour(
  const Pid& self,
  StatePtr& _state,
  const Message& message
) -> ResultUnion
{
  if (not _state)
  {
    _state = std::make_shared<DisplayActorState>();
  }

  auto& state = *(std::static_pointer_cast<DisplayActorState>(_state));
  auto& u8g2 = state.u8g2;

  if (matches(message, "ClearDisplay"))
  {
    // Clear the buffer
    u8g2_ClearBuffer(&u8g2);

    // Send the buffer to the display
    u8g2_SendBuffer(&u8g2);
  }

  const DisplayIntent* display_intent;
  if (matches(message, "ShowUserDetails", display_intent))
  {
    switch (display_intent->action_type())
    {
      case DisplayAction::ShowUserDetails:
      {
        const auto* show_user_details_action = (
          display_intent->action_as_ShowUserDetails()
        );
        const auto& line1 = show_user_details_action->name();
        const auto& line2 = show_user_details_action->makerlabs_id();

        // Clear the buffer
        u8g2_ClearBuffer(&u8g2);

        // Draw line1: Full Name
        if (line1)
        {
          printf("%s\n", line1->c_str());
          u8g2_SetFont(&u8g2, u8g2_font_helvR10_tr);
          u8g2_DrawStr(&u8g2, 0, 13, line1->c_str());
        }

        // Draw line2: 1.2s
        if (line2)
        {
          printf("%s\n", line2->c_str());
          u8g2_SetFont(&u8g2, u8g2_font_helvB14_tr);
          u8g2_DrawStr(&u8g2, 0, 31, line2->c_str());
        }

        // Send the buffer to the display
        u8g2_SendBuffer(&u8g2);

        break;
      }

      default:
        break;
    }

    return {Result::Ok};
  }

  return {Result::Unhandled};
}
