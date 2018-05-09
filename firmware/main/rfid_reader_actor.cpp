#include "actors.h"

#include "hid_global_reader.h"

#include "esp_log.h"

#include <chrono>

using namespace ActorModel;

using namespace std::chrono_literals;

constexpr char TAG[] = "rfid_reader_actor";

struct RFIDReaderActorState
{
  RFIDReaderActorState(const WiegandReader::Config& config)
  : rfid_reader(config)
  {}

  HIDGlobalReader rfid_reader;
  HIDGlobalReader::MaybeTagId scanned_tag_prev;
};

auto rfid_reader_actor_behaviour(
  const Pid& self,
  StatePtr& _state,
  const Message& message
) -> ResultUnion
{
  if (not _state)
  {
    auto pins_config = WiegandReader::Config{
      .data0_pin = 32,
      .data1_pin = 33,
      .hold_pin = 22,
      .red_led_pin = 17,
      .green_led_pin = 15,
      .beeper_pin = 23
    };

    _state = std::make_shared<RFIDReaderActorState>(pins_config);
  }
  auto& state = *(std::static_pointer_cast<RFIDReaderActorState>(_state));

  if (matches(message, "scan"))
  {
    const auto scanned_tag = state.rfid_reader.last_scanned_tag;

    if (scanned_tag != state.scanned_tag_prev)
    {
      if (scanned_tag)
      {
        printf(
          "found tag, facility_code = %i, card_number = %i\n",
          scanned_tag->facility_code,
          scanned_tag->card_number
        );

        state.rfid_reader.beep(300ms);

        auto permissions_check_actor_pid = *(whereis("permissions_check"));
        auto tag_id_str = std::to_string(scanned_tag->card_number);
        send(permissions_check_actor_pid, "tag_seen", tag_id_str);
      }
      else {
        printf("lost tag\n");

        state.rfid_reader.beep(150ms);

        auto permissions_check_actor_pid = *(whereis("permissions_check"));
        send(permissions_check_actor_pid, "tag_lost");

        auto display_actor_pid = *(whereis("display"));
        send(display_actor_pid, "ClearDisplay");
      }

      state.scanned_tag_prev = scanned_tag;
    }

    return Ok;
  }

  return Unhandled;
}
