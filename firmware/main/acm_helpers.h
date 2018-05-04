#pragma once

#include "acm_generated.h"
#include "gviz_generated.h"

#include <experimental/string_view>
#include <string>
#include <unordered_map>

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

auto generate_user_from_query_results(
  const GViz::Query* query,
  const GViz::Datatable* datatable
) -> flatbuffers::DetachedBuffer;

auto generate_activity(
  const std::string& machine_id_str,
  const ACM::ActivityType activity_type,
  const ACM::User* user = nullptr
) -> flatbuffers::DetachedBuffer;

auto activity_to_json(const ACM::Activity* activity)
  -> std::string;

auto generate_activity_json(
  const std::string& machine_id_str,
  const ACM::ActivityType activity_type,
  const ACM::User* user = nullptr
) -> std::string;

auto generate_permissions_check_query_string(
  GViz::Query* query,
  const std::experimental::string_view tag_id_str
) -> std::string;

auto generate_log(
  const std::experimental::string_view machine_id_str,
  const ACM::LogSeverity severity,
  const std::experimental::string_view message_str
) -> flatbuffers::DetachedBuffer;

auto log_to_json(const ACM::Log* log)
  -> std::string;

auto generate_log_json(
  const std::experimental::string_view machine_id_str,
  const ACM::LogSeverity severity,
  const std::experimental::string_view message_str
) -> std::string;

auto generate_show_user_details_from_user(
  const ACM::User* user
) -> flatbuffers::DetachedBuffer;
