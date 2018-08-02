// Copyright Paul Reimer, 2018
//
// This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 Unported License.
// To view a copy of this license, visit
// https://creativecommons.org/licenses/by-nc-sa/4.0/
// or send a letter to
// Creative Commons, 444 Castro Street, Suite 900, Mountain View, California, 94041, USA.

library makerlabs_acm_functions;

import "dart:async";
import "dart:core";
import "dart:convert";
import "dart:math";
import "dart:typed_data" show Uint8List;
import "dart:io" as io;
import "dart:js_util" as js;

// Dart / Firebase Functions interop
import 'package:firebase_functions_interop/firebase_functions_interop.dart';

// Dart / NodeJS interop
import "package:node_http/node_http.dart" as http;

// Google APIs (Sheets)
import "package:googleapis_auth/auth.dart";
import "package:googleapis_auth/src/auth_http_utils.dart";
import "package:googleapis/sheets/v4.dart";

// Local packages
import "src/gen/acm_a_c_m_generated.dart" as ACM;

const String ACM_FILE_IDENTIFIER = "ACM.";

// Users permissions check query:
const String SPREADSHEET_USERS_SHEET_NAME = "Users";

// Activity row append:
const String SPREADSHEET_ACTIVITY_SHEET_NAME = "Activity";

// This global value will persist across function invocations
String USER_COLUMNS_DATATABLE;

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

// Firebase Function HTTPS handler
Future<void> permissions_check(ExpressHttpRequest request) async {
  // Early exit for external ping check to keep function "warm"
  if (request.requestedUri.queryParameters.containsKey("ping")) {
    request.response
      ..statusCode = 200 // OK
      ..close();
    return;
  }

  // Wrap the entire function in a future,
  // Using a global catchError at then end to return 500 error
  new Future<void>(() => true).then((_) async {
    final config = FirebaseFunctions.config;
    // Google Sheets ACM Spreadsheet ID
    final String SPREADSHEET_ID = config.get("acm.spreadsheet_id");
    if (SPREADSHEET_ID == null) {
      throw ("Missing Firebase functions env var: acm.spreadsheet_id");
    }

    final String SPREADSHEET_QUERY_AUTHORITY = "docs.google.com";
    final String SPREADSHEET_QUERY_PATH =
        "/spreadsheets/d/" + SPREADSHEET_ID + "/gviz/tq";

    // Parse request headers
    // Extract OAuth access_token from request, use it for Google API requests
    String access_token;
    {
      String auth = request.headers.value("authorization");
      // Check for valid Authorization header
      if (auth == null) {
        request.response.statusCode = 401; // Unauthorized
        throw ("Missing Authorization header in request");
      }

      // Extract the access_token part from the Authorization header
      final auth_parts = auth.split(" ");
      if (auth_parts.length != 2 ||
          auth_parts.first != "Bearer" ||
          auth_parts.last.isEmpty) {
        request.response.statusCode = 401; // Unauthorized
        throw ("Invalid 'Authorization: Bearer <token>' header in request");
      }
      access_token = auth_parts[1];
    }

    // Parse request query parameters
    final queryParameters = request.requestedUri.queryParameters;

    // Parse request body
    // Expect a binary ACM.Activity flatbuffer
    //Uint8List bytes = request.body;
    Uint8List bytes = new Uint8List(request.body.length);
    for (var i = 0; i < bytes.length; ++i) {
      bytes[i] = request.body[i];
    }
    final activity = new ACM.Activity(bytes);

    // Check that the Activity flatbuffer has the expected fields
    if (activity.time == null ||
        activity.tagId == null ||
        activity.activityType == null) {
      request.response.statusCode = 400; // Bad Request
      throw ("Invalid (empty) Activity in request body");
    }

    // Generate credentials from existing token, guessing at best-case expiry time
    final expiry = new DateTime.now().add(new Duration(hours: 1)).toUtc();
    final accessToken = new AccessToken("Bearer", access_token, expiry);
    final credentials = new AccessCredentials(accessToken, null, []);

    // Create a base HTTP client which will be (re)used for GoogleAPIs requests
    final baseClient = new http.NodeClient();
    // Wrap base client with an OAuth2-token-aware version from googleapis_auth
    final googleApisHttpClient =
        new AuthenticatedClient(baseClient, credentials);

    // Extract the latest Sheets API from the generated APIs
    final sheets = new SheetsApi(googleApisHttpClient);

    // Check for cached User sheet columns, fetch them if not present
    if (USER_COLUMNS_DATATABLE == null) {
      // Extract all columns but do not return any rows
      final String query = "limit 0";

      final uri =
          Uri.https(SPREADSHEET_QUERY_AUTHORITY, SPREADSHEET_QUERY_PATH, {
        "sheet": SPREADSHEET_USERS_SHEET_NAME,
        "tq": query,
        "access_token": access_token,
      });
      final headers = {
        "X-DataSource-Auth": "force-json-workaround",
      };
      USER_COLUMNS_DATATABLE =
          await http.get(uri, headers: headers).then((response) {
        // Check for valid query response
        if (response.statusCode != 200) // OK
        {
          request.response.statusCode =
              response.statusCode; // Same as upstream response
          throw ("Columns fetch operation failed: ${response.statusCode}");
        }

        String datatableJson = response.body;
        // Check for a valid response, which may or may not contain a user
        // Remove "" prefix from response JSON
        const String googleMagic = ")]}'\n";
        if (datatableJson.startsWith(googleMagic)) {
          datatableJson = datatableJson.substring(googleMagic.length);
        }

        return datatableJson;
      });
      print("Did update USER_COLUMNS_DATATABLE via spreadsheet query");
    } else {
      print("Use cached USER_COLUMNS_DATATABLE");
    }

    final Map usersColumnsDatatable = json.decode(USER_COLUMNS_DATATABLE);
    if (usersColumnsDatatable == null ||
        !usersColumnsDatatable.containsKey("table") ||
        !usersColumnsDatatable["table"].containsKey("cols") ||
        usersColumnsDatatable["table"]["cols"].isEmpty) {
      request.response.statusCode = 502; // Bad Gateway
      throw ("Invalid (empty) Google GViz Datatable in fields JSON");
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
    final List<List<String>> selectColumnLabels = [
      ["Maker Info", "Name"],
      ["Maker Info", "Display Name"],
      ["Maker Info", "Email"],
      ["Membership Info", "MakerLabs ID"],
      ["Membership Info", "Maker Status"],
      ["Membership Info", "Alerts"],
      ["Access & Studio", "Tag ID"]
    ];

    for (int i = 0; i < selectColumnLabels.length; ++i) {
      final List<String> label = selectColumnLabels[i];
      final String columnName =
          labelToColumnId(usersColumnsDatatable, label[0], label[1]);
      if (columnName == null) {
        throw ("Invalid/missing ${SPREADSHEET_USERS_SHEET_NAME} column in section: '${label[0]}, label: ${label[1]}'");
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
      throw ("Invalid/missing ${SPREADSHEET_USERS_SHEET_NAME} Tag ID column for query");
    }

    final query = ("select " +
        select.join(",") +
        " where " +
        tagIdColumnId +
        " = \"" +
        activity.tagId +
        "\"" +
        " limit " +
        "1");

    final uri = Uri.https(SPREADSHEET_QUERY_AUTHORITY, SPREADSHEET_QUERY_PATH, {
      "sheet": SPREADSHEET_USERS_SHEET_NAME,
      "tq": query,
      "access_token": access_token,
    });
    final headers = {
      "X-DataSource-Auth": "force-json-workaround",
    };
    final ACM.User user =
        await http.get(uri, headers: headers).then((response) {
      // Check for valid query response
      if (response.statusCode != 200) // OK
      {
        request.response.statusCode =
            response.statusCode; // Same as upstream response
        throw ("Google Query operation failed: ${response.statusCode}");
      }

      String datatableJson = response.body;
      // Check for a valid response, which may or may not contain a user
      // Remove "" prefix from response JSON
      const String googleMagic = ")]}'\n";
      if (datatableJson.startsWith(googleMagic)) {
        datatableJson = datatableJson.substring(googleMagic.length);
      }

      final Map datatable = json.decode(datatableJson);

      if (datatable == null ||
          !datatable.containsKey("table") ||
          !datatable["table"].containsKey("rows")) {
        request.response.statusCode = 502; // Bad Gateway
        throw ("Invalid Google GViz Datatable in query response");
      }

      if (!datatable["table"]["rows"].isEmpty) {
        final userRow = datatable["table"]["rows"][0]["c"];

        final String name = (userRow[1] != null)
            ? userRow[1]["v"]
            : (userRow[0] != null) ? userRow[0]["v"] : null;
        final String email = (userRow[2] != null) ? userRow[2]["v"] : null;
        final String makerlabs_id =
            (userRow[3] != null) ? userRow[3]["v"] : null;
        final String maker_status =
            (userRow[4] != null) ? userRow[4]["v"] : null;
        final String alerts = (userRow[5] != null) ? userRow[5]["v"] : null;
        final String tagId = (userRow[6] != null) ? userRow[6]["v"] : null;

        final List<String> permissions = [];
        for (int i = 7; i < userRow.length; ++i) {
          String permissionValue =
              (userRow[i] != null) ? userRow[i]["v"] : null;
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

        final userBytes = userBuilder.toBytes(ACM_FILE_IDENTIFIER);
        if (userBytes == null) {
          throw ("Invalid (empty) User response flatbuffer");
        }

        final user = new ACM.User(userBytes);
        print("got User: ${user}");

        request.response
          ..headers.add("Content-Type", "application/octet-stream")
          ..statusCode = 200 // OK
          ..add(userBytes)
          ..close();
        return user;
      } else {
        print("No matching User for Activity tag_id: ${activity.tagId}");
      }

      // Return an empty response if no User was found
      request.response
        ..headers.add("Content-Type", "application/octet-stream")
        ..statusCode = 200 // OK
        ..close();
      return null;
    }).catchError((e) {
      // Re-throw errors to the parent catchError
      print("inner catchError: '${e}'");
      throw e;
    });

    final String activityTypeStr =
        (activity.activityType == ACM.ActivityType.Signed_In
            ? "Signed_In"
            : activity.activityType == ACM.ActivityType.Signed_Out
                ? "Signed_Out"
                : activity.activityType == ACM.ActivityType.CNC_Job
                    ? "CNC_Job"
                    : "Unknown");

    // Insert a sample Activity row
    final List<List<Object>> values = [
      [
        activity.time,
        activity.machineId,
        activityTypeStr,
        activity.usageSeconds,
        activity.tagId,
        user?.makerlabsId,
        user?.makerStatus,
      ]
    ];

    final ValueRange valueRange = new ValueRange()
      ..range = SPREADSHEET_ACTIVITY_SHEET_NAME
      ..values = values;

    await sheets.spreadsheets.values.append(
      valueRange,
      SPREADSHEET_ID,
      SPREADSHEET_ACTIVITY_SHEET_NAME,
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
    );
  }).catchError((e) {
    // In case of general failure, return response with exception text
    print("Trapped exception: ${e.toString()}");
    // If a specific error code has not been set, send a general error
    if (request.response.statusCode < 400) {
      request.response.statusCode = 500; // Internal Server Error
    }
    request.response
      ..write(e.toString())
      ..close();
    return;
  });
}
