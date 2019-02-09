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
/// @brief Utility functions for spreadsheet columns<->index, string helpers,
/// and Google Visualization DataTable parsing.
import "dart:math";

/// @brief Get column letter from column index
///
/// @param colNum Column index, 0-based
///
/// @return Column letter
String toColumnName(int colNum) {
  /// http://cwestblog.com/2013/09/05/javascript-snippet-convert-number-to-column-name/
  String ret = "";
  for (int a = 1, b = 26; (colNum -= a) >= 0; a = b, b *= 26) {
    ret = String.fromCharCode(((colNum % b) ~/ a) + 65) + ret;
  }
  return ret;
}

/// @brief Get column number from column letter
///
/// @param colName Column letter
///
/// @return Column index, 0-based
int toColumnNum(String colName) {
  /// http://cwestblog.com/2013/09/05/javascript-snippet-convert-number-to-column-name/
  int colNum = 0;
  for (int i = 0; i < colName.length; ++i) {
    colNum += (int.parse(colName[i], radix: 36) - 9) *
        pow(26, colName.length - i - 1);
  }
  return colNum;
}

/// @brief Check whether a given string represents "yes" ("☑", "t", "y", etc)
///
/// @param s Candidate input string
///
/// @return `True` if the input represents "yes".
bool isYesLike(String s) {
  const yesLike = ["☑", "Y", "y", "T", "t", "Yes", "yes", "True", "true"];
  return yesLike.contains(s);
}

/// @brief Check whether a given string represents "no" ("☐", "f", "n", etc)
///
/// @param s Candidate input string
///
/// @return `True` if the input represents "no".
bool isNoLike(String s) {
  const noLike = ["☐", "N", "n", "F", "f", "No", "no", "False", "false"];
  return noLike.contains(s);
}

/// @brief Get the label string of the Nth column from a DataTable.
///
/// @param datatable Google Visualization DataTable
/// @param i Index of desired column, 0-based
///
/// @return Full label of matching column, or null.
String nthColumnLabel(Map datatable, int i) {
  if (datatable != null &&
      datatable.containsKey("table") &&
      datatable["table"].containsKey("cols") &&
      datatable["table"]["cols"].length >= i &&
      datatable["table"]["cols"][i].containsKey("label")) {
    return datatable["table"]["cols"][i]["label"];
  }

  return null;
}

/// @brief Get the column letter for a specific label (with optional prefix)
///
/// @param datatable Google Visualization DataTable
/// @param prefix Prefix string to strip from field before matching
/// @param label Label string to match
///
/// @return Column letter for a matching column, or null.
String labelToColumnId(Map datatable, String prefix, String label) {
  if (datatable != null &&
      datatable.containsKey("table") &&
      datatable["table"].containsKey("cols")) {
    for (int i = 0; i < datatable["table"]["cols"].length; ++i) {
      if (datatable["table"]["cols"][i].containsKey("label")) {
        if (datatable["table"]["cols"][i]["label"] == "${prefix} ${label}" ||
            datatable["table"]["cols"][i]["label"] == "${label}") {
          return datatable["table"]["cols"][i]["id"];
        }
      }
    }
  }

  return null;
}

/// @}
