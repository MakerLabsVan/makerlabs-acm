// Copyright Paul Reimer, 2018
//
// This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 Unported License.
// To view a copy of this license, visit
// https://creativecommons.org/licenses/by-nc-sa/4.0/
// or send a letter to
// Creative Commons, 444 Castro Street, Suite 900, Mountain View, California, 94041, USA.

import "dart:io";

import "spreadsheet_helpers.dart";
import "http_response_exception.dart";

String generate_permissions_check_query(Map usersColumnsDatatable,
    List<List<String>> selectColumnLabels, String tagId) {
  // Validate datatable
  if (usersColumnsDatatable == null ||
      !usersColumnsDatatable.containsKey("table") ||
      !usersColumnsDatatable["table"].containsKey("cols") ||
      usersColumnsDatatable["table"]["cols"].isEmpty) {
    throw new HttpResponseException(
        "Invalid (empty) Google GViz Datatable in fields JSON",
        statusCode: HttpStatus.badGateway);
  }

  // Determine Permissions columns (first and count)
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

  // Generate select portion of query
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

  for (int i = 0; i <= numPermissionsColumns; ++i) {
    select.add(toColumnName(firstPermissionColumnNum + i));
  }

  // Execute permissions check query
  final tagIdColumnId =
      labelToColumnId(usersColumnsDatatable, "Access & Studio", "Tag ID");
  if (tagIdColumnId == null) {
    throw ("Invalid/missing Tag ID column for query");
  }

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
