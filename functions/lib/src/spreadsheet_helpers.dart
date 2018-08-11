// Copyright Paul Reimer, 2018
//
// This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 Unported License.
// To view a copy of this license, visit
// https://creativecommons.org/licenses/by-nc-sa/4.0/
// or send a letter to
// Creative Commons, 444 Castro Street, Suite 900, Mountain View, California, 94041, USA.

import "dart:math";

// http://cwestblog.com/2013/09/05/javascript-snippet-convert-number-to-column-name/
String toColumnName(int colNum) {
  String ret = "";
  for (int a = 1, b = 26; (colNum -= a) >= 0; a = b, b *= 26) {
    ret = String.fromCharCode(((colNum % b) ~/ a) + 65) + ret;
  }
  return ret;
}

// http://cwestblog.com/2013/09/05/javascript-snippet-convert-number-to-column-name/
int toColumnNum(String colName) {
  int colNum = 0;
  for (int i = 0; i < colName.length; ++i) {
    colNum += (int.parse(colName[i], radix: 36) - 9) *
        pow(26, colName.length - i - 1);
  }
  return colNum;
}

bool isYesLike(String s) {
  const yesLike = ["☑", "Y", "y", "T", "t", "Yes", "yes", "True", "true"];
  return yesLike.contains(s);
}

bool isNoLike(String s) {
  const noLike = ["☐", "N", "n", "F", "f", "No", "no", "False", "false"];
  return noLike.contains(s);
}

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
