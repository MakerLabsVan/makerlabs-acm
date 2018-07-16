#include "actors.h"

#include "hid_global_reader.h"

#include "esp_log.h"

#include <chrono>

using namespace ActorModel;

using namespace std::chrono_literals;

constexpr char TAG[] = "rfid_reader_actor";

struct RFIDReaderActorState
{
  RFIDReaderActorState()
  : rfid_reader({
    .data0_pin = 32,
    .data1_pin = 33,
    .hold_pin = 22,
    .red_led_pin = 17,
    .green_led_pin = 15,
    .beeper_pin = 23
  })
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
    _state = std::make_shared<RFIDReaderActorState>();
  }
  auto& state = *(std::static_pointer_cast<RFIDReaderActorState>(_state));

  {
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

#if CONFIG_ACM_ENABLE_SIGNED_IN_ACTIVITY
          state.rfid_reader.beep(300ms);
#endif // CONFIG_ACM_ENABLE_SIGNED_IN_ACTIVITY

          auto tag_id_str = std::to_string(scanned_tag->card_number);

          auto main_actor_pid = *(whereis("app"));
          send(main_actor_pid, "tag_found", tag_id_str);
        }
        else {
          printf("lost tag\n");

#if CONFIG_ACM_ENABLE_SIGNED_OUT_ACTIVITY
          state.rfid_reader.beep(150ms);
#endif // CONFIG_ACM_ENABLE_SIGNED_OUT_ACTIVITY

          auto tag_id_str = std::to_string(state.scanned_tag_prev->card_number);

          auto main_actor_pid = *(whereis("app"));
          send(main_actor_pid, "tag_lost", tag_id_str);
        }

        state.scanned_tag_prev = scanned_tag;
      }

      return {Result::Ok};
    }
  }

  return {Result::Unhandled};
}
