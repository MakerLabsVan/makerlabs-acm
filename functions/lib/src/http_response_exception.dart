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
/// @brief Custom `Exception` class which has an optional `statusCode` and `uri`
/// to indicate details of a failed HTTP request.

/// @class HttpResponseException
///
/// @brief Custom `Exception` class which has an optional `statusCode` and `uri`
/// to indicate details of a failed HTTP request.
class HttpResponseException implements Exception {
  final String reasonPhrase;
  final int statusCode;
  final Uri uri;

  HttpResponseException(this.reasonPhrase, {this.statusCode = 500, this.uri});

  String toString() => "$uri: $statusCode $reasonPhrase";
}

/// @}
