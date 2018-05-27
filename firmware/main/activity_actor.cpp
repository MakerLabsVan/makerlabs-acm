#include "actors.h"

#include "display_generated.h"

#include "u8g2_esp32_hal.h"

#include "esp_log.h"

using namespace ActorModel;
using namespace Display;

constexpr char TAG[] = "activity_actor";

struct ActivityActorState
{
  ActivityActorState()
  {
  }
};

auto activity_actor_behaviour(
  const Pid& self,
  StatePtr& _state,
  const Message& message
) -> ResultUnion
{
  if (not _state)
  {
    _state = std::make_shared<ActivityActorState>();
  }
  auto& state = *(std::static_pointer_cast<ActivityActorState>(_state));

  return {Result::Unhandled};
}
