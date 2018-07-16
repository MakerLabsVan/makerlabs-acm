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
import "dart:js_util" as js;

// Dart / Firebase Functions interop
import "package:firebase_functions_interop/firebase_functions_interop.dart";

// Dart / NodeJS interop
import "package:node_http/node_http.dart" as http;

// Firebase Function HTTPS handler
Future<void> google_apps_script_proxy(ExpressHttpRequest request) async {
  // Early exit for external ping check to keep function "warm"
  if (request.requestedUri.queryParameters.containsKey("ping")) {
    request.response
      ..statusCode = 200 // OK
      ..close();
    return;
  }

  // Early exit for CORS preflight check
  if (request.method == "OPTIONS") {
    request.response
      ..headers.add("Access-Control-Allow-Origin", "*")
      ..headers.add("Access-Control-Allow-Headers", "Authorization")
      ..statusCode = 200 // OK
      ..close();
    return;
  }

  // Wrap the entire function in a future,
  // Using a global catchError at then end to return 500 error
  new Future<void>(() => true).then((_) async {
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

    final proxy_path = request.uri.path.startsWith("/google_apps_script_proxy")
        ? request.uri.path.substring("/google_apps_script_proxy".length)
        : request.uri.path;

    final proxy_uri = request.uri
        .replace(scheme: "https", host: "script.google.com", path: proxy_path);

    final proxy_headers = {
      "Authorization": "Bearer ${access_token}",
    };

    print("Proxy URI: ${proxy_uri}");

    http.get(proxy_uri, headers: proxy_headers).then((response) {
      // Copy upstream response headers to response
      for (String k in response.headers.keys) {
        String v = response.headers[k];
        request.response.headers.add(k, v);
      }

      print("Proxy response status code: ${response.statusCode}");
      request.response
        ..statusCode = response.statusCode
        ..write(response.body)
        ..close();
    }).catchError((e) {
      // Re-throw errors to the parent catchError
      print("Google Apps Script proxy request error: '${e}'");
      throw e;
    });
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
  });
}
