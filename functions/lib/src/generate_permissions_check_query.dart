// Copyright Paul Reimer, 2018
//
// This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 Unported License.
// To view a copy of this license, visit
// https://creativecommons.org/licenses/by-nc-sa/4.0/
// or send a letter to
// Creative Commons, 444 Castro Street, Suite 900, Mountain View, California, 94041, USA.

/// @addtogroup functions
/// @{
/// @file
/// @brief Generate a query to return all permissions (and optional additional
/// columns) for a specific user by `Tag ID`.
import "dart:io" show HttpStatus;

import "spreadsheet_helpers.dart";
import "http_response_exception.dart";

/// @brief Generate a query to return all permissions (and optional additional
/// columns) for a specific user by `Tag ID`.
///
/// @param usersColumnsDatatable Google Visualization query result DataTable
/// @param selectColumnLabels (optional) Additional section headers/labels to
/// select
/// @param tagId `Tag ID` of desired user
///
/// @return String of query in Google Visualization SQL
String generate_permissions_check_query(Map usersColumnsDatatable,
    List<List<String>> selectColumnLabels, String tagId) {
  /// Steps:
  /// -# Validate datatable
  if (usersColumnsDatatable == null ||
      !usersColumnsDatatable.containsKey("table") ||
      !usersColumnsDatatable["table"].containsKey("cols") ||
      usersColumnsDatatable["table"]["cols"].isEmpty) {
    throw new HttpResponseException(
        "Invalid (empty) Google GViz Datatable in fields JSON",
        statusCode: HttpStatus.badGateway);
  }

  /// -# Search for label that starts with `"Permissions"`, count how many
  /// columns precede it (non-permissions columns) and follow it (permissions
  /// columns only).
  var firstPermissionColumnNum;
  var numPermissionsColumns = 0;
  {
    final cols = usersColumnsDatatable["table"]["cols"];
    for (var colIdx = 0; colIdx < cols.length; ++colIdx) {
      if (cols[colIdx].containsKey("id") &&
          cols[colIdx].containsKey("label") &&
          cols[colIdx]["label"].length > 0 &&
          cols[colIdx]["label"].startsWith("Permissions")) {
        final String firstPermissionColumn = cols[colIdx]["id"];

        firstPermissionColumnNum = toColumnNum(firstPermissionColumn);
        numPermissionsColumns = cols.length - firstPermissionColumnNum;
        break;
      }
    }
  }

  /// -# Add provided `selectedColumnLabels` labels to the select portion of the
  /// query
  final List<String> select = [];
  for (int i = 0; i < selectColumnLabels.length; ++i) {
    final List<String> label = selectColumnLabels[i];
    final String columnName =
        labelToColumnId(usersColumnsDatatable, label[0], label[1]);
    if (columnName == null) {
      throw ("Invalid/missing column in section: '${label[0]}, label: ${label[1]}'");
    }
    select.add(columnName);
  }

  /// -# Add permissions column labels to the select portion of the query
  for (int i = 0; i <= numPermissionsColumns; ++i) {
    select.add(toColumnName(firstPermissionColumnNum + i));
  }

  /// -# Find column ID for `Tag ID` column and add it to the select portion of
  /// the query
  final tagIdColumnId =
      labelToColumnId(usersColumnsDatatable, "Access & Studio", "Tag ID");
  if (tagIdColumnId == null) {
    throw ("Invalid/missing Tag ID column for query");
  }

  /// -# Execute permissions check query
  final query = ("select " +
      select.join(",") +
      " where " +
      tagIdColumnId +
      " = \"" +
      tagId +
      "\"" +
      " limit " +
      "1");
  return query;
}

/// @}
