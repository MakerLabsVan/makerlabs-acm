#include "acm_helpers.h"

#include "googleapis.h"

#include "display_generated.h"

#include <experimental/string_view>
#include <chrono>

using namespace ACM;
using namespace Display;
using namespace GViz;
using namespace googleapis;

using string = std::string;
using string_view = std::experimental::string_view;

auto PrefixColumnLabelHashFunc::operator()(const PrefixedColumnLabel& column) const
  -> std::size_t
{
  return std::hash<string>()(column.prefix + column.name);
}

auto PrefixColumnLabelEqualFunc::operator()(
  const PrefixedColumnLabel& lhs,
  const PrefixedColumnLabel& rhs
) const
  -> bool
{
  return (
    (lhs.prefix == rhs.prefix)
    and (lhs.name == rhs.name)
  );
}

auto generate_user_from_query_results(
  const GViz::Query* query,
  const GViz::Datatable* datatable
) -> flatbuffers::DetachedBuffer
{
  flatbuffers::FlatBufferBuilder fbb;

  string_view name_str;
  string_view email_str;
  string_view makerlabs_id_str;
  string_view tag_serial_str;
  string_view alerts_str;

  if (
    query
    and query->select()
    and datatable
    and datatable->rows()
    and datatable->rows()->Length() >= 1
  )
  {
    const auto* select_cols = query->select();
    const auto* rows = datatable->rows();

    // Use the first row, ignore the rest
    const auto* row = rows->Get(0);
    const auto* cells = row->c();
    for (auto col_idx = 0; col_idx < cells->Length(); ++col_idx)
    {
      const auto* col = select_cols->Get(col_idx);
      const auto* cell = cells->Get(col_idx);
      const auto* value = cell->v();
      const auto* label = col->label();

      if (value)
      {
        const auto& label_str = label->str();
        // Only set name if not already set (allow 'Display Name' to override)
        if (label_str == "Name" and name_str.empty())
        {
          name_str = value->c_str();
        }
        else if (label_str == "Display Name")
        {
          name_str = value->c_str();
        }
        else if (label_str == "Email")
        {
          email_str = value->c_str();
        }
        else if (label_str == "MakerLabs ID")
        {
          makerlabs_id_str = value->c_str();
        }
        else if (label_str == "Tag ID")
        {
          tag_serial_str = value->c_str();
        }
        else if (label_str == "Alerts")
        {
          alerts_str = value->c_str();
        }
        else {
          printf("Unknown column label '%s' = '%s'\n", col->label()->c_str(), value->c_str());
        }
      }
      else {
        printf("Column '%s' missing value\n", col->label()->c_str());
      }
    }
  }

  auto user_loc = CreateUserDirect(
    fbb,
    name_str.data(),
    email_str.data(),
    makerlabs_id_str.data(),
    tag_serial_str.data(),
    alerts_str.data()
  );
  fbb.Finish(user_loc, ActivityIdentifier());

  return fbb.Release();
}

auto activity_to_json(const Activity* activity)
  -> string
{
  string activity_json = (
    string{"{\"values\": [["}
    + "\"" + (
      activity->machine_id()
      ? activity->machine_id()->str()
      : "" )
    + "\","
    + "\"" + (
      activity->makerlabs_id()
      ? activity->makerlabs_id()->str()
      : "" )
    + "\","
    + "\"" + (
      activity->tag_serial()
      ? activity->tag_serial()->str()
      : "" )
    + "\","
    + "\"" + EnumNameActivityType(activity->activity_type()) + "\","
    + std::to_string(activity->time()) + ","
    + std::to_string(activity->usage_seconds())
    + "]]}"
  );

  return activity_json;
}

auto generate_activity(
  const std::string& machine_id_str,
  const ActivityType activity_type,
  const User* user
) -> flatbuffers::DetachedBuffer
{
  flatbuffers::FlatBufferBuilder fbb;
  auto epoch_seconds = std::chrono::duration_cast<std::chrono::seconds>(
    std::chrono::system_clock::now().time_since_epoch()
  ).count();

  auto activity_loc = CreateActivityDirect(
    fbb,
    machine_id_str.c_str(),
    user and user->makerlabs_id()? user->makerlabs_id()->c_str() : nullptr,
    user and user->tag_serial()? user->tag_serial()->c_str() : nullptr,
    activity_type,
    epoch_seconds
  );
  fbb.Finish(activity_loc, ActivityIdentifier());

  return fbb.Release();
}

auto generate_activity_json(
  const std::string& machine_id_str,
  const ActivityType activity_type,
  const User* user
) -> std::string
{
  const auto activity_flatbuf = generate_activity(
    machine_id_str,
    activity_type,
    user
  );
  const Activity* activity = flatbuffers::GetRoot<Activity>(
    activity_flatbuf.data()
  );
  return activity_to_json(activity);
}

auto generate_permissions_check_query_string(
  Query* query,
  const string_view tag_id_str
) -> std::string
{
  // Mutate tag id to match latest scanned tag
  auto* where = query->mutable_where();
  for (auto clause_idx = 0; clause_idx < where->size(); ++clause_idx)
  {
    auto* clause = where->GetMutableObject(clause_idx);
    auto* col_label = clause->column()->label();
    if (col_label->str() == "Tag ID")
    {
      if (tag_id_str.size() <= clause->value()->Length())
      {
        mutate_value(tag_id_str, clause->mutable_value());
      }
      else {
        printf(
          "New Tag ID '%.*s' too long to mutate existing Tag ID '%s'\n",
          tag_id_str.size(), tag_id_str.data(),
          clause->value()->c_str()
        );
      }
    }
  }

  return build_query(query);
}

auto log_to_json(const Log* log)
  -> string
{
  string log_json = (
    string{"{\"values\": [["}
    + "\"" + (
      log->machine_id()
      ? log->machine_id()->str()
      : "" )
    + "\","
    + "\"" + EnumNameLogSeverity(log->severity()) + "\","
    + std::to_string(log->time()) + ","
    + "\"" + log->message()->str() + "\","
    + "]]}"
  );

  return log_json;
}

auto generate_log(
  const string_view machine_id_str,
  const LogSeverity severity,
  const string_view message_str
) -> flatbuffers::DetachedBuffer
{
  flatbuffers::FlatBufferBuilder fbb;
  auto epoch_seconds = std::chrono::duration_cast<std::chrono::seconds>(
    std::chrono::system_clock::now().time_since_epoch()
  ).count();

  auto log_loc = CreateLog(
    fbb,
    fbb.CreateString(machine_id_str.data(), machine_id_str.size()),
    severity,
    epoch_seconds,
    fbb.CreateString(message_str.data(), message_str.size())
  );
  fbb.Finish(log_loc, ActivityIdentifier());

  return fbb.Release();
}

auto generate_log_json(
  const string_view machine_id_str,
  const ACM::LogSeverity severity,
  const string_view message_str
) -> std::string
{
  const auto log_flatbuf = generate_log(
    machine_id_str,
    severity,
    message_str
  );
  const Log* log = flatbuffers::GetRoot<Log>(
    log_flatbuf.data()
  );
  return log_to_json(log);
}

auto generate_show_user_details_from_user(
  const ACM::User* user
) -> flatbuffers::DetachedBuffer
{
  flatbuffers::FlatBufferBuilder fbb;

  auto action_loc = CreateShowUserDetailsDirect(
    fbb,
    user && user->name()? user->name()->c_str() : nullptr,
    user && user->email()? user->email()->c_str() : nullptr,
    user && user->makerlabs_id()? user->makerlabs_id()->c_str() : nullptr,
    user && user->tag_serial()? user->tag_serial()->c_str() : nullptr
  );

  auto display_intent_loc = CreateDisplayIntent(
    fbb,
    DisplayAction::ShowUserDetails,
    action_loc.Union()
  );

  fbb.Finish(display_intent_loc, DisplayIntentIdentifier());

  return fbb.Release();
}
