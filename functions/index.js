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
/// @brief Serverless framework Google Functions HTTP handler for
/// /google_apps_script_proxy

/// @name /google_apps_script_proxy Firebase Functions handler imports
/// @{

/// Firebase Functions SDK
const functions = require("firebase-functions");

/// Dart <-> JS Interop generated entrypoint
const index = require("./build/node/index.dart.js");
/// @}

/// @name /google_apps_script_proxy Firebase Functions handler exports
/// @{

//exports.permissions_check = functions.https.onRequest((req, res) => {
//  index.permissions_check_http(req, res);
//});

/// @brief Export /google_apps_script_proxy Firebase Functions handler
/// @hideinitializer
exports.google_apps_script_proxy = functions.https.onRequest((req, res) => {
  index.google_apps_script_proxy_http(req, res);
});
exports.activity_subscription = index.activity_subscription;

/// @}

/// @}
