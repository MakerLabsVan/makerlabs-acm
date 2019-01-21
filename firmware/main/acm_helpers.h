#pragma once

#include "acm_generated.h"
#include "display_generated.h"

#include "timestamp.h"

#include <experimental/string_view>

using DisplayIntentFlatbuffer = flatbuffers::DetachedBuffer;
using ActivityFlatbuffer = flatbuffers::DetachedBuffer;
using LogFlatbuffer = flatbuffers::DetachedBuffer;
using UserFlatbuffer = flatbuffers::DetachedBuffer;

auto generate_activity(
  const std::experimental::string_view machine_id_str,
  const ACM::ActivityType activity_type,
  const std::experimental::string_view tag_id_str,
  const int usage_seconds = 0
) -> ActivityFlatbuffer;

auto generate_log(
  const std::experimental::string_view machine_id_str,
  const ACM::LogSeverity severity,
  const std::experimental::string_view message_str
) -> LogFlatbuffer;

auto generate_show_user_details_from_user(
  const ACM::User* user
) -> DisplayIntentFlatbuffer;

auto generate_progress_bar(
  const std::experimental::string_view message,
  const uint32_t progress,
  const TimeDuration duration,
  const Display::Icon icon = Display::Icon::None
) -> DisplayIntentFlatbuffer;

auto generate_show_user_details(
  const std::experimental::string_view message,
  const std::experimental::string_view email,
  const std::experimental::string_view makerlabs_id,
  const std::experimental::string_view tag_id
) -> DisplayIntentFlatbuffer;
