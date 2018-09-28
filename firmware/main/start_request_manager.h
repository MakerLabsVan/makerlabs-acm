#pragma once

// actor_model
#include "actor_model.h"

auto start_request_manager(
  const ActorModel::Pid& sup_pid,
  const ActorModel::Message& message
) -> ActorModel::ResultUnion;
