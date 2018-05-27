#pragma once

#include "acm_generated.h"
#include "googleapis.h"

#include <experimental/string_view>
#include <string>
#include <unordered_map>

using namespace googleapis::Sheets;
using namespace googleapis::Visualization;

using QueryFlatbuffer = flatbuffers::DetachedBuffer;
using QueryStringFlatbuffer = flatbuffers::DetachedBuffer;
using DisplayIntentFlatbuffer = flatbuffers::DetachedBuffer;
using ActivityFlatbuffer = flatbuffers::DetachedBuffer;
using LogFlatbuffer = flatbuffers::DetachedBuffer;
using UserFlatbuffer = flatbuffers::DetachedBuffer;
using InsertRowFlatbuffer = flatbuffers::DetachedBuffer;

struct PrefixedColumnLabel
{
  std::string prefix = "";
  std::string name;
};

struct PrefixColumnLabelHashFunc
{
  auto operator()(const PrefixedColumnLabel& column) const
    -> std::size_t;
};

struct PrefixColumnLabelEqualFunc
{
  auto operator()(
    const PrefixedColumnLabel& lhs,
    const PrefixedColumnLabel& rhs
  ) const
    -> bool;
};

using ColumnIdMap = std::unordered_map<
  PrefixedColumnLabel,
  std::string,
  PrefixColumnLabelHashFunc,
  PrefixColumnLabelEqualFunc
>;

auto generate_user_from_query_intent_with_results(
  const googleapis::Visualization::QueryIntent* query_intent,
  const googleapis::Visualization::Datatable* datatable
) -> UserFlatbuffer;

auto generate_activity(
  const std::experimental::string_view machine_id_str,
  const ACM::ActivityType activity_type,
  const std::experimental::string_view tag_id_str
) -> ActivityFlatbuffer;

auto activity_to_json(const ACM::Activity* activity)
  -> std::string;

auto generate_activity_json(
  const std::experimental::string_view machine_id_str,
  const ACM::ActivityType activity_type,
  const std::experimental::string_view tag_id_str
) -> std::string;

auto update_permissions_check_query_intent(
  MutableQueryIntentFlatbuffer& query_intent_mutable_buf,
  const std::experimental::string_view tag_id_str
) -> bool;

auto generate_log(
  const std::experimental::string_view machine_id_str,
  const ACM::LogSeverity severity,
  const std::experimental::string_view message_str
) -> LogFlatbuffer;

auto log_to_json(const ACM::Log* log)
  -> std::string;

auto generate_log_json(
  const std::experimental::string_view machine_id_str,
  const ACM::LogSeverity severity,
  const std::experimental::string_view message_str
) -> std::string;

auto generate_show_user_details_from_user(
  const ACM::User* user
) -> DisplayIntentFlatbuffer;
