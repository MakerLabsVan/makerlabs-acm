// Copyright Paul Reimer, 2018
//
// This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 Unported License.
// To view a copy of this license, visit
// https://creativecommons.org/licenses/by-nc-sa/4.0/
// or send a letter to
// Creative Commons, 444 Castro Street, Suite 900, Mountain View, California, 94041, USA.

import "dart:async";

// Dart / NodeJS interop
import "package:node_http/node_http.dart" as http;

import "http_response_exception.dart";

Future<String> fetch_sheet_columns(
    String authority, String path, String sheetName, String accessToken) {
  // Extract all columns but do not return any rows
  final String query = "limit 0";

  final uri = Uri.https(authority, path, {
    "sheet": sheetName,
    "tq": query,
    "access_token": accessToken,
  });
  final headers = {
    "X-DataSource-Auth": "force-json-workaround",
  };
  return http.get(uri, headers: headers).then((response) {
    // Check for valid query response
    if (response.statusCode != 200) // OK
    {
      throw new HttpResponseException(
          "Columns fetch operation failed: ${response.statusCode}",
          statusCode: response.statusCode);
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
}
