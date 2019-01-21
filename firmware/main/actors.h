#pragma once

#include "actor_model.h"

// superloop behaviours
auto display_behaviour(
  const ActorModel::Pid& self,
  ActorModel::Mailbox& mailbox
) -> ActorModel::ResultUnion;

// actor behaviours
auto app_actor_behaviour(
  const ActorModel::Pid& self,
  ActorModel::StatePtr& _state,
  const ActorModel::Message& message
) -> ActorModel::ResultUnion;

auto auth_actor_behaviour(
  const ActorModel::Pid& self,
  ActorModel::StatePtr& _state,
  const ActorModel::Message& message
) -> ActorModel::ResultUnion;

auto rfid_reader_actor_behaviour(
  const ActorModel::Pid& self,
  ActorModel::StatePtr& _state,
  const ActorModel::Message& message
) -> ActorModel::ResultUnion;

auto machine_actor_behaviour(
  const ActorModel::Pid& self,
  ActorModel::StatePtr& _state,
  const ActorModel::Message& message
) -> ActorModel::ResultUnion;
