#pragma once

#include "actor_model.h"

auto display_actor_behaviour(
  const ActorModel::Pid& self,
  ActorModel::StatePtr& _state,
  const ActorModel::Message& message
) -> ActorModel::ResultUnion;

auto reauth_actor_behaviour(
  const ActorModel::Pid& self,
  ActorModel::StatePtr& _state,
  const ActorModel::Message& message
) -> ActorModel::ResultUnion;

auto permissions_check_actor_behaviour(
  const ActorModel::Pid& self,
  ActorModel::StatePtr& _state,
  const ActorModel::Message& message
) -> ActorModel::ResultUnion;

auto google_sheets_actor_behaviour(
  const ActorModel::Pid& self,
  ActorModel::StatePtr& _state,
  const ActorModel::Message& message
) -> ActorModel::ResultUnion;

auto rfid_reader_actor_behaviour(
  const ActorModel::Pid& self,
  ActorModel::StatePtr& _state,
  const ActorModel::Message& message
) -> ActorModel::ResultUnion;
