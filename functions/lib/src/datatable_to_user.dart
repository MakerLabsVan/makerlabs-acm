// Copyright Paul Reimer, 2018
//
// This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 Unported License.
// To view a copy of this license, visit
// https://creativecommons.org/licenses/by-nc-sa/4.0/
// or send a letter to
// Creative Commons, 444 Castro Street, Suite 900, Mountain View, California, 94041, USA.

import "dart:io";

// Local packages
import "gen/acm_a_c_m_generated.dart" as ACM;

import "http_response_exception.dart";
import "spreadsheet_helpers.dart";

const String ACM_FILE_IDENTIFIER = "ACM.";

datatable_to_user(Map datatable) {
  if (datatable == null ||
      !datatable.containsKey("table") ||
      !datatable["table"].containsKey("rows")) {
    throw new HttpResponseException(
        "Invalid Google GViz Datatable in query response",
        statusCode: HttpStatus.badGateway);
  }

  if (datatable["table"]["rows"].isEmpty) {
    print("No matching User for Activity tag_id");
  }

  final userRow = datatable["table"]["rows"][0]["c"];

  final String name = (userRow[1] != null)
      ? userRow[1]["v"]
      : (userRow[0] != null) ? userRow[0]["v"] : null;
  final String email = (userRow[2] != null) ? userRow[2]["v"] : null;
  final String makerlabs_id = (userRow[3] != null) ? userRow[3]["v"] : null;
  final String maker_status = (userRow[4] != null) ? userRow[4]["v"] : null;
  final String alerts = (userRow[5] != null) ? userRow[5]["v"] : null;
  final String tagId = (userRow[6] != null) ? userRow[6]["v"] : null;

  final List<String> permissions = [];
  for (int i = 7; i < userRow.length; ++i) {
    String permissionValue = (userRow[i] != null) ? userRow[i]["v"] : null;
    if (isYesLike(permissionValue)) {
      String permissionLabel = nthColumnLabel(datatable, i);
      permissions.add(permissionLabel);
    }
  }

  final userBuilder = new ACM.UserObjectBuilder(
    name: name,
    email: email,
    makerlabsId: makerlabs_id,
    makerStatus: maker_status,
    tagId: tagId,
    alerts: alerts,
    permissions: permissions,
  );

  return userBuilder.toBytes(ACM_FILE_IDENTIFIER);
}
