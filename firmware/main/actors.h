#pragma once

#include "actor_model.h"

auto app_actor_behaviour(
  const ActorModel::Pid& self,
  ActorModel::StatePtr& _state,
  const ActorModel::Message& message
) -> ActorModel::ResultUnion;

auto display_actor_behaviour(
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
