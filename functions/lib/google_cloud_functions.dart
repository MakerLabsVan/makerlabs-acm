// Copyright Paul Reimer, 2018
//
// This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 Unported License.
// To view a copy of this license, visit
// https://creativecommons.org/licenses/by-nc-sa/4.0/
// or send a letter to
// Creative Commons, 444 Castro Street, Suite 900, Mountain View, California, 94041, USA.

@JS()
library google_cloud_functions;

import "package:js/js.dart";
import "package:node_interop/http.dart" as _http;

// Add JS interop types for Google Cloud Functions request object
// The request has the body already buffered based on MIME type
@JS()
@anonymous
abstract class GoogleCloudFunctionsRequest implements _http.IncomingMessage {
  // User will supply the desired type (String, List<int>, ...)
  external dynamic get body;
}

// Add JS interop types for Google Cloud Functions response object
@JS()
@anonymous
abstract class GoogleCloudFunctionsResponse implements _http.ServerResponse {
}
