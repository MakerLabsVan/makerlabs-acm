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

// Dart / NodeJS interop
import "package:node_http/node_http.dart" as http;
import "package:node_interop/buffer.dart";

// Google APIs (Sheets)
import "package:googleapis_auth/auth.dart";
import "package:googleapis_auth/src/auth_http_utils.dart";
import "package:googleapis/sheets/v4.dart";

// Local packages
import "google_cloud_functions.dart";
import "src/gen/acm_a_c_m_generated.dart" as ACM;

const String ACM_FILE_IDENTIFIER = "ACM.";

// Google Sheets ACM Spreadsheet ID
const String SPREADSHEET_ID = "1Sd3nYY34dllVUsakwU8hLnJQ1m-U50qZwQSxst2SKKg";

// Users permissions check query:
const String SPREADSHEET_QUERY_AUTHORITY = "docs.google.com";
const String SPREADSHEET_QUERY_PATH = "/spreadsheets/d/" + SPREADSHEET_ID + "/gviz/tq";

const String SPREADSHEET_USERS_SHEET_GID = "0";

// Activity row append:
const String SPREADSHEET_ACTIVITY_SHEET_NAME = "Activity";

const String USER_COLUMNS_DATATABLE_FIXTURE = '{"version":"0.6","reqId":"0","status":"ok","sig":"2147058372","table":{"cols":[{"id":"A","label":"Row","type":"number","pattern":"General"},{"id":"B","label":"Maker Info Photo","type":"string"},{"id":"C","label":"Name","type":"string"},{"id":"D","label":"Display Name","type":"string"},{"id":"E","label":"Email","type":"string"},{"id":"F","label":"Alternate Email","type":"string"},{"id":"G","label":"Company","type":"string"},{"id":"H","label":"Phone","type":"string"},{"id":"I","label":"Membership Info MakerLabs ID","type":"string"},{"id":"J","label":"Maker Status","type":"string"},{"id":"K","label":"Alerts","type":"string"},{"id":"L","label":"Notes","type":"string"},{"id":"M","label":"Membership Start Date","type":"number","pattern":"General"},{"id":"N","label":"Membership End Date","type":"number","pattern":"General"},{"id":"O","label":"Membership Billing Date","type":"number","pattern":"General"},{"id":"P","label":"Studio Billing Date","type":"number","pattern":"General"},{"id":"Q","label":"Extended Hours Billing Date","type":"number","pattern":"General"},{"id":"R","label":"MakerLabs Industries Studio Billing Date","type":"number","pattern":"General"},{"id":"S","label":"Waiver Signed","type":"string"},{"id":"T","label":"Waiver Signed Date","type":"string"},{"id":"U","label":"Access & Studio Tag ID","type":"string"},{"id":"V","label":"MakerLabs Building Access","type":"string"},{"id":"W","label":"MakerLabs Industries Building Access","type":"string"},{"id":"X","label":"MakerLabs Studio(s)","type":"string"},{"id":"Y","label":"MakerLabs Industries Studio(s)","type":"number","pattern":"General"},{"id":"Z","label":"Total Studio Area","type":"number","pattern":"General"},{"id":"AA","label":"Studio Start Date","type":"number","pattern":"General"},{"id":"AB","label":"Studio End Date","type":"number","pattern":"General"},{"id":"AC","label":"MakerLabs Industries Studio Start Date","type":"number","pattern":"General"},{"id":"AD","label":"MakerLabs Industries Studio End Date","type":"string"},{"id":"AE","label":"Permissions 24/7 Membership","type":"string"},{"id":"AF","label":"Power","type":"string"},{"id":"AG","label":"Wood Lab 101","type":"string"},{"id":"AH","label":"Metal Lab 101","type":"string"},{"id":"AI","label":"Fibre Lab 101","type":"string"},{"id":"AJ","label":"CNC Router 101","type":"string"},{"id":"AK","label":"Laser Lab 101","type":"string"},{"id":"AL","label":"Welding 101","type":"string"},{"id":"AM","label":"Vinyl Lab 101","type":"string"},{"id":"AN","label":"Electronics 101","type":"string"},{"id":"AO","label":"3D Printing & Scanning 101","type":"string"},{"id":"AP","label":"Wood Lab 102","type":"string"},{"id":"AQ","label":"2D Vector Design 101","type":"string"},{"id":"AR","label":"3D Modelling 101","type":"string"},{"id":"AS","label":"Creative Coding 101","type":"string"},{"id":"AT","label":"Metal Laser Lab 101","type":"string"},{"id":"AU","label":"CNC Milling 101","type":"string"},{"id":"AV","label":"Photo Lab 101","type":"string"},{"id":"AW","label":"Lathe 101","type":"string"}],"rows":[]}}';

// vim: set ft=javascript:

// http://cwestblog.com/2013/09/05/javascript-snippet-convert-number-to-column-name/
String toColumnName(int colNum)
{
  String ret = "";
  for (int a = 1, b = 26; (colNum -= a) >= 0; a = b, b *= 26)
  {
    ret = String.fromCharCode(((colNum % b) ~/ a) + 65) + ret;
  }
  return ret;
}

// http://cwestblog.com/2013/09/05/javascript-snippet-convert-number-to-column-name/
int toColumnNum(String colName)
{
  int colNum = 0;
  for (int i = 0; i < colName.length; ++i)
  {
    colNum += (int.parse(colName[i], radix: 36) - 9) * pow(26, colName.length - i - 1);
  }
  return colNum;
}

bool isYesLike(String s)
{
  const yesLike = ["☑","Y","y","T","t","Yes","yes","True","true"];
  return yesLike.contains(s);
}

bool isNoLike(String s)
{
  const noLike = ["☐","N","n","F","f","No","no","False","false"];
  return noLike.contains(s);
}

String nthColumnLabel(Map datatable, int idx)
{
  if (
    datatable != null &&
    datatable.containsKey("table") &&
    datatable["table"].containsKey("cols") &&
    datatable["table"]["cols"].length >= idx &&
    datatable["table"]["cols"][idx].containsKey("label")
  )
  {
    return datatable["table"]["cols"][idx]["label"];
  }

  return null;
}

class JsObject
{
  final dynamic _object;

  const JsObject(this._object);

  dynamic operator[](String name) => js.getProperty(_object, name);
  operator[]=(String name, dynamic value) => js.setProperty(_object, name, value);
}

// Cloud Function HTTP handler
void permissions_check(
  GoogleCloudFunctionsRequest req,
  GoogleCloudFunctionsResponse res
) async
{
  // Wrap the entire function in a future,
  // Using a global catchError at then end to return 500 error
  new Future<void>(() => true)
  .then((_) async
  {
    // Parse request headers
    // Extract OAuth access_token from request, use it for Google API requests
    String access_token;
    {
      final headers = JsObject(req.headers);
      final auth = headers["Authorization"] ?? headers["authorization"];
      // Check for valid Authorization header
      if (auth == null)
      {
        res.statusCode = 401; // Unauthorized
        throw("Missing Authorization header in request");
      }

      // Extract the access_token part from the Authorization header
      final auth_parts = auth.split(" ");
      if (
        auth_parts.length != 2 ||
        auth_parts[0] != "Bearer" ||
        auth_parts[1].isEmpty
      )
      {
        res.statusCode = 401; // Unauthorized
        throw("Invalid 'Authorization: Bearer <token>' header in request");
      }
      access_token = auth_parts[1];
    }

    // Parse request query parameters
    final queryParameters = Uri.parse(req.url).queryParameters;
    if (queryParameters.containsKey("label"))
    {
    }

    // Parse request body
    // Expect a binary ACM.Activity flatbuffer
    Uint8List bytes = req.body;
    final activity = new ACM.Activity(bytes);

    // Check that the Activity flatbuffer has the expected fields
    if (
      activity.time == null
      || activity.tagId == null
      || activity.activityType == null
    )
    {
      res.statusCode = 400; // Bad Request
      throw("Invalid (empty) Activity in request body");
    }

    // Generate credentials from existing token, guessing at best-case expiry time
    final expiry = new DateTime.now().add(new Duration(hours: 1)).toUtc();
    final accessToken = new AccessToken("Bearer", access_token, expiry);
    final credentials =  new AccessCredentials(accessToken, null, []);

    // Create a base HTTP client which will be (re)used for GoogleAPIs requests
    final baseClient = new http.NodeClient();
    // Wrap base client with an OAuth2-token-aware version from googleapis_auth
    final googleApisHttpClient = new AuthenticatedClient(baseClient, credentials);

    // Extract the latest Sheets API from the generated APIs
    final sheets = new SheetsApi(googleApisHttpClient);

    final Map usersColumnsDatatable = json.decode(USER_COLUMNS_DATATABLE_FIXTURE);
    if (
      usersColumnsDatatable == null ||
      !usersColumnsDatatable.containsKey("table") ||
      !usersColumnsDatatable["table"].containsKey("cols") ||
      usersColumnsDatatable["table"]["cols"].isEmpty
    )
    {
      res.statusCode = 502; // Bad Gateway
      throw("Invalid (empty) Google GViz Datatable in fields JSON");
    }

    // Determine Permissions columns (first and count)
    var firstPermissionColumnNum;
    var numPermissionsColumns = 0;
    {
      final cols = usersColumnsDatatable["table"]["cols"];
      for (var colIdx = 0; colIdx < cols.length; ++colIdx)
      {
        if (
          cols[colIdx].containsKey("id") &&
          cols[colIdx].containsKey("label") &&
          cols[colIdx]["label"].length > 0 &&
          cols[colIdx]["label"].startsWith("Permissions")
        )
        {
          final String firstPermissionColumn = cols[colIdx]["id"];

          firstPermissionColumnNum = toColumnNum(firstPermissionColumn);
          numPermissionsColumns = cols.length - firstPermissionColumnNum;
          break;
        }
      }
    }

    // Generate select portion of query
    final List<String> select = ["C", "D", "E", "I", "K", "U"];
    for (int i = 0; i <= numPermissionsColumns; ++i)
    {
      select.add(toColumnName(firstPermissionColumnNum + i));
    }

    // Execute permissions check query
    final tagIdColumn = "U";

    final query = (
      "select " + select.join(",") +
      " where " + tagIdColumn + " = \"" + activity.tagId + "\"" +
      " limit " + "1"
    );

    http.get(
      Uri.https(
        SPREADSHEET_QUERY_AUTHORITY,
        SPREADSHEET_QUERY_PATH,
        {
          "gid": SPREADSHEET_USERS_SHEET_GID,
          "tq": query,
          "access_token": access_token,
        }
      ),
      headers: {
        "X-DataSource-Auth": "force-json-workaround",
      }
    )
    .then((response)
    {
      // Check for valid query response
      if (response.statusCode != 200) // OK
      {
        res.statusCode = response.statusCode; // Same as upstream response
        throw("Google Query operation failed: ${response.statusCode}");
      }

      String datatableJson = response.body;
      // Check for a valid response, which may or may not contain a user
      // Remove "" prefix from response JSON
      const String googleMagic = ")]}'\n";
      if (datatableJson.startsWith(googleMagic))
      {
        datatableJson = datatableJson.substring(googleMagic.length);
      }

      final Map datatable = json.decode(datatableJson);

      if (
        datatable == null ||
        !datatable.containsKey("table") ||
        !datatable["table"].containsKey("rows")
      )
      {
        res.statusCode = 502; // Bad Gateway
        throw("Invalid Google GViz Datatable in query response");
      }

      if (!datatable["table"]["rows"].isEmpty)
      {
        final userRow = datatable["table"]["rows"][0]["c"];

        final String name = (userRow[1] != null)? userRow[1]["v"] : (userRow[0] != null)? userRow[0]["v"] : null;
        final String email = (userRow[2] != null)? userRow[2]["v"] : null;
        final String makerlabsId = (userRow[3] != null)? userRow[3]["v"] : null;
        final String alerts = (userRow[4] != null)? userRow[4]["v"] : null;
        final String tagId = (userRow[5] != null)? userRow[5]["v"] : null;

        final List<String> permissions = [];
        for (int i = 6; i < userRow.length; ++i)
        {
          String permissionValue = (userRow[i] != null)? userRow[i]["v"] : null;
          if (isYesLike(permissionValue))
          {
            String permissionLabel = nthColumnLabel(datatable, i);
            permissions.add(permissionLabel);
          }
        }

        final userBuilder = new ACM.UserObjectBuilder(
          name: name,
          email: email,
          makerlabsId: makerlabsId,
          tagId: tagId,
          alerts: alerts,
          permissions: permissions,
        );

        final userBytes = userBuilder.toBytes(ACM_FILE_IDENTIFIER);
        if (userBytes == null)
        {
          throw("Invalid (empty) User response flatbuffer");
        }

        final user = new ACM.User(userBytes);

        res
          ..statusCode = 200 // OK
          ..write(Buffer.from(userBytes))
          ..end();
      }
      else {
        print("No matching User for Activity tag_id: ${activity.tagId}");
      }

      // Return an empty response if no User was found
      res
        ..statusCode = 200 // OK
        ..end();
    })
    // Re-throw errors to the parent catchError
    .catchError((e) { throw e; });

    final String activityTypeStr = (
      activity.activityType == ACM.ActivityType.Signed_In? "Signed_In"
      : activity.activityType == ACM.ActivityType.Signed_Out? "Signed_Out"
      : activity.activityType == ACM.ActivityType.CNC_Job? "CNC_Job"
      : "Unknown"
    );

    // Insert a sample Activity row
    final List<List<Object>> values = [[
      activity.time,
      activity.machineId,
      activityTypeStr,
      activity.usageSeconds,
      activity.tagId,
    ]];

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
  })
  // In case of general failure, return response with exception text
  .catchError((e)
  {
    print(e.toString());
    // If a specific error code has not been set, send a general error
    if (res.statusCode < 400)
    {
      res.statusCode = 500; // Internal Server Error
    }
    res
      ..write(e.toString())
      ..end();
  });
}