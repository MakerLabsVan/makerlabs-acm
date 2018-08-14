// Copyright Paul Reimer, 2018
//
// This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 Unported License.
// To view a copy of this license, visit
// https://creativecommons.org/licenses/by-nc-sa/4.0/
// or send a letter to
// Creative Commons, 444 Castro Street, Suite 900, Mountain View, California, 94041, USA.

import "dart:async";
import "dart:core";

// Dart / Firebase Functions interop

// Dart / NodeJS interop
import "package:node_http/node_http.dart" as http;

// Google Cloud Functions interop
import "google_cloud_functions.dart";

// Firebase Function HTTPS handler
//Future<void> google_apps_script_proxy(ExpressHttpRequest request) async {
void google_apps_script_proxy(GoogleCloudFunctionsRequest request,
    GoogleCloudFunctionsResponse response) async {
  // Early exit for external ping check to keep function "warm"
  final uri = Uri.parse(request.url);
  if (uri.queryParameters.containsKey("ping")) {
    response
      ..statusCode = 200 // OK
      ..end();
    return;
  }

  // Early exit for CORS preflight check
  if (request.method == "OPTIONS") {
    response
      ..setHeader("Access-Control-Allow-Origin", "*")
      ..setHeader("Access-Control-Allow-Headers", "Authorization")
      ..statusCode = 200 // OK
      ..end();
    return;
  }

  // Wrap the entire function in a future,
  // Using a global catchError at then end to return 500 error
  new Future<void>(() => true).then((_) async {
    Map<String, String> proxy_query =
        new Map.from(uri.queryParameters);
    Map<String, String> proxy_headers = {};

    // Parse request headers
    // Extract OAuth access_token from request, use it for Google API requests
    String access_token;
    {
      String auth = request.headers.value("authorization");
      // Check for valid Authorization header
      if (auth != null) {
        // Extract the access_token part from the Authorization header
        final auth_parts = auth.split(" ");
        if (auth_parts.length != 2 ||
            auth_parts.first != "Bearer" ||
            auth_parts.last.isEmpty) {
          response.statusCode = 401; // Unauthorized
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
        response.statusCode = 401; // Unauthorized
        throw ("Missing Authorization header in request");
      }
    }

    final proxy_path = uri.path.startsWith("/google_apps_script_proxy")
        ? uri.path.substring("/google_apps_script_proxy".length)
        : uri.path;

    final proxy_uri = uri.replace(
        scheme: "https",
        host: "script.google.com",
        path: proxy_path,
        queryParameters: proxy_query);

    print("Proxy URI: ${proxy_uri}");

    http.get(proxy_uri, headers: proxy_headers).then((proxyResponse) {
      // Copy upstream response headers to response
      for (String k in proxyResponse.headers.keys) {
        String v = proxyResponse.headers[k];
        response.setHeader(k, v);
      }

      print("Proxy response status code: ${proxyResponse.statusCode}");
      response
        ..statusCode = proxyResponse.statusCode
        ..write(proxyResponse.body)
        ..end();
    }).catchError((e) {
      // Re-throw errors to the parent catchError
      print("Google Apps Script proxy request error: '${e}'");
      throw e;
    });
  }).catchError((e) {
    // In case of general failure, return response with exception text
    print("Trapped exception: ${e.toString()}");
    // If a specific error code has not been set, send a general error
    if (response.statusCode < 400) {
      response.statusCode = 500; // Internal Server Error
    }
    response
      ..write(e.toString())
      ..end();
  });
}
