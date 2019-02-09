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
/// @brief Parse HTTP Authorization header to extract an OAuth access token.
import "dart:io" show HttpStatus;

import "http_response_exception.dart";

/// @brief Parse HTTP Authorization header to extract an OAuth access token.
///
/// @param auth_header HTTP Authorization header in format
/// `"Authorization: Bearer {token}"``
///
/// @returns OAuth access token string
/// @throws HttpResponseException if header is missing or invalid
String extract_access_token(auth_header) {
  // Check for valid Authorization header
  if (auth_header == null) {
    throw new HttpResponseException("Missing Authorization header in request",
        statusCode: HttpStatus.unauthorized);
  }

  // Extract the access_token part from the Authorization header
  final auth_parts = auth_header.split(" ");
  if (auth_parts.length != 2 ||
      auth_parts.first != "Bearer" ||
      auth_parts.last.isEmpty) {
    throw new HttpResponseException(
        "Invalid 'Authorization: Bearer <token>' header in request",
        statusCode: 401);
  }

  String access_token = auth_parts[1];
  return access_token;
}

/// @}
