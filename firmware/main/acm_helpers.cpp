#include "acm_helpers.h"

#include "display_generated.h"

#include <experimental/string_view>
#include <chrono>

using namespace ACM;
using namespace Display;

using string_view = std::experimental::string_view;

auto generate_activity(
  const string_view machine_id_str,
  const ActivityType activity_type,
  const string_view tag_id_str
) -> ActivityFlatbuffer
{
  flatbuffers::FlatBufferBuilder fbb;
  auto epoch_milliseconds = std::chrono::duration_cast<std::chrono::milliseconds>(
    std::chrono::system_clock::now().time_since_epoch()
  ).count();

  auto activity_loc = CreateActivity(
    fbb,
    epoch_milliseconds,
    fbb.CreateString(machine_id_str),
    activity_type,
    0, // usage_seconds?
    fbb.CreateString(tag_id_str)
  );
  fbb.Finish(activity_loc, ActivityIdentifier());

  return fbb.Release();
}

auto generate_log(
  const string_view machine_id_str,
  const LogSeverity severity,
  const string_view message_str
) -> LogFlatbuffer
{
  flatbuffers::FlatBufferBuilder fbb;
  auto epoch_milliseconds = std::chrono::duration_cast<std::chrono::milliseconds>(
    std::chrono::system_clock::now().time_since_epoch()
  ).count();

  auto log_loc = CreateLog(
    fbb,
    fbb.CreateString(machine_id_str),
    severity,
    epoch_milliseconds,
    fbb.CreateString(message_str)
  );
  fbb.Finish(log_loc, ActivityIdentifier());

  return fbb.Release();
}

auto generate_show_user_details_from_user(
  const ACM::User* user
) -> DisplayIntentFlatbuffer
{
  flatbuffers::FlatBufferBuilder fbb;

  auto display_loc = CreateShowUserDetails(
    fbb,
    (user && user->name())? fbb.CreateString(user->name()->string_view()) : 0,
    (user && user->email())? fbb.CreateString(user->email()->string_view()) : 0,
    (user && user->makerlabs_id())? fbb.CreateString(user->makerlabs_id()->string_view()) : 0,
    (user && user->tag_id())? fbb.CreateString(user->tag_id()->string_view()) : 0
  );

  auto display_intent_loc = CreateDisplayIntent(
    fbb,
    DisplayAction::ShowUserDetails,
    display_loc.Union()
  );

  fbb.Finish(display_intent_loc, DisplayIntentIdentifier());

  return fbb.Release();
}

auto generate_progress_bar(
  const std::experimental::string_view message,
  const uint32_t progress,
  const Icon icon
) -> DisplayIntentFlatbuffer
{
  flatbuffers::FlatBufferBuilder fbb;

  auto display_loc = CreateProgressBar(
    fbb,
    fbb.CreateString(message),
    progress,
    icon
  );

  auto display_intent_loc = CreateDisplayIntent(
    fbb,
    DisplayAction::ProgressBar,
    display_loc.Union()
  );

  fbb.Finish(display_intent_loc, DisplayIntentIdentifier());

  return fbb.Release();
}
