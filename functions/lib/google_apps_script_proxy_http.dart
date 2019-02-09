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
/// @brief HTTPS handler for /google_apps_script_proxy
import "dart:async";
import "dart:core";
import "dart:io" show HttpStatus;

// Dart / NodeJS interop
import "package:node_http/node_http.dart" as http;

// Google Cloud Functions interop
import "google_cloud_functions.dart";

// Local packages
import "src/http_response_exception.dart";

/// @brief Firebase Function HTTPS handler
///
/// @param request HTTP request
/// @param response HTTP response
void google_apps_script_proxy_http(GoogleCloudFunctionsRequest request,
    GoogleCloudFunctionsResponse response) async {
  /// Steps:
  /// - (Check for external ping to keep function "warm", exit 200 immediately)
  final uri = Uri.parse(request.url);
  if (uri.queryParameters.containsKey("ping")) {
    print("ping");
    response
      ..statusCode = HttpStatus.ok
      ..end();
    return;
  }

  /// - (Check for CORS preflight check, exit 200 immediately)
  if (request.method == "OPTIONS") {
    response
      ..setHeader("Access-Control-Allow-Origin", "*")
      ..setHeader("Access-Control-Allow-Headers", "Authorization")
      ..statusCode = HttpStatus.ok
      ..end();
    return;
  }

  // Return 500 error for any unhandled exceptions
  try {
    Map<String, String> proxy_query = new Map.from(uri.queryParameters);
    Map<String, String> proxy_headers = {};

    /// -# Extract OAuth `access_token` from received request headers, use it
    /// for Google API requests
    String access_token;
    {
      String auth;
      for (int i = 0; i < (request.rawHeaders.length - 1); ++i) {
        if (request.rawHeaders[i] == "Authorization" ||
            request.rawHeaders[i] == "authorization") {
          auth = request.rawHeaders[i + 1];
        }
      }

      // Check for valid Authorization header
      if (auth != null) {
        // Extract the access_token part from the Authorization header
        final auth_parts = auth.split(" ");
        if (auth_parts.length != 2 ||
            auth_parts.first != "Bearer" ||
            auth_parts.last.isEmpty) {
          response.statusCode = HttpStatus.unauthorized;
          throw ("Invalid 'Authorization: Bearer <token>' header in request");
        }
        access_token = auth_parts[1];
        proxy_headers["Authorization"] = "Bearer ${access_token}";
      } else if (proxy_query.containsKey("access_token")) {
        // Extract access_token from query parameter
        // Move it to Authorization: Bearer header and remove from query
        access_token = proxy_query["access_token"];
        proxy_headers["Authorization"] = "Bearer ${access_token}";
        proxy_query.remove("access_token");
      } else {
        response.statusCode = HttpStatus.unauthorized;
        throw ("Missing Authorization header in request");
      }
    }

    /// -# Strip `/google_apps_script_proxy` from received URL path
    final proxy_path = uri.path.startsWith("/google_apps_script_proxy")
        ? uri.path.substring("/google_apps_script_proxy".length)
        : uri.path;

    /// -# Create upstream URL path as `https://script.google.com/{path}`
    final proxy_uri = uri.replace(
        scheme: "https",
        host: "script.google.com",
        path: proxy_path,
        queryParameters: proxy_query);

    print("Proxy URI: ${proxy_uri}");

    /// -# Send the request, copy upstream response headers to the proxied
    /// response
    http.get(proxy_uri, headers: proxy_headers).then((proxyResponse) {
      // Copy upstream response headers to response
      for (String k in proxyResponse.headers.keys) {
        String v = proxyResponse.headers[k];
        response.setHeader(k, v);
      }

      print("Proxy response status code: ${proxyResponse.statusCode}");

      /// -# Return the body of the upstream response as the body of the proxied
      /// response
      response
        ..statusCode = proxyResponse.statusCode
        ..write(proxyResponse.body)
        ..end();
    }).catchError((e) {
      // Re-throw errors to the parent catchError
      print("Google Apps Script proxy request error: '${e}'");
      throw e;
    });
  } catch (e) {
    print("Trapped exception: ${e.toString()}");

    /// - (In case of failure, return response with exception text. Use the
    /// error code from the upstream response if available, otherwise use 500.)
    response.statusCode = (e is HttpResponseException)
        ? e.statusCode
        : HttpStatus.internalServerError;

    response
      ..write(e.toString())
      ..end();
  }
}

/// @}
