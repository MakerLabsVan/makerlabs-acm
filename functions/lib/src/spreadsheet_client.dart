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
/// @brief Provide an (authenticated) Google Sheets REST API client.
import "dart:core";

// Google APIs (Sheets)
import "package:googleapis_auth/auth.dart";
import "package:googleapis_auth/src/auth_http_utils.dart";
import "package:googleapis/sheets/v4.dart";

// Dart / NodeJS interop
import "package:node_http/node_http.dart" as http;

/// @brief Create a Google SheetsApi handle using a provided OAuth access token.
///
/// @param accessToken OAuth access token
/// @param baseClient (optional) Existing `http.NodeClient` HTTP client to use
///
/// @returns SheetsApi handle
SheetsApi spreadsheet_client(String accessToken, [http.NodeClient baseClient]) {
  /// -# Generate credentials from existing token, guessing at best-case expiry
  /// time (1 hour)
  final expiry = new DateTime.now().add(new Duration(hours: 1)).toUtc();
  final accessTokenObj = new AccessToken("Bearer", accessToken, expiry);
  final credentials = new AccessCredentials(accessTokenObj, null, []);

  /// -# Create a base HTTP client which will be used for Google API requests
  if (baseClient == null) {
    baseClient = new http.NodeClient();
  }

  /// -# Wrap base client with OAuth2-token-aware version from googleapis_auth
  final googleApisHttpClient = new AuthenticatedClient(baseClient, credentials);

  /// -# Extract the latest Sheets API from the generated APIs
  final sheets = new SheetsApi(googleApisHttpClient);
  return sheets;
}

/// @}
