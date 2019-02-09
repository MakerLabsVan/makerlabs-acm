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
/// @brief Serverless framework Express wrapper to make AWS Lambda behave like
/// Google/Firebase Functions HTTPS handler for /permissions_check

/// @name /permissions_check AWS Lambda HTTPS handler imports
/// @{

/// Express server to run Google Cloud Function handler
const express = require("express");
/// Express middleware to wrap (req,res) handlers as an AWS Lambda handler
const serverless = require("serverless-http");
/// Express middleware to provide the full request body in a req.body field
const bodyParser = require("body-parser");

/// (req,res)-style Dart handlers
const index = require("./build/node/index.dart.js");

/// Setup Express server to run (req,res)-style Dart handlers
const app = express();
/// Provide request body as raw binary Buffer
app.use(bodyParser.raw());
/// @}

// Add routing for (req,res)-style Dart handlers
app.all("/permissions_check", (req, res) => {
  index.permissions_check_http(req, res);
});
app.all("/google_apps_script_proxy", (req, res) => {
  index.google_apps_script_proxy_http(req, res);
});

/// @name /permissions_check AWS Lambda HTTPS handler exports
/// Re-export the Express server wrapped as an AWS Lambda-compatible handler
/// @{

/// @brief Export /permissions_check AWS Lambda handler, much lower-latency than
/// Google/Firebase Functions leading to faster tag scanning response times.
/// @hideinitializer
exports.permissions_check = serverless(app, {
  request: (request, event, context) => {
    // Pass Authorization header to lambda if it was provided
    if (event && event.headers && event.headers.Authorization) {
      request.headers.Authorization = event.headers.Authorization;
      request.rawHeaders.push("Authorization", event.headers.Authorization);
    }
    // Pass Content-Type header to lambda if it was provided
    if (event && event.headers && event.headers["Content-Type"]) {
      request.headers["Content-Type"] = event.headers["Content-Type"];
      request.rawHeaders.push("Content-Type", event.headers["Content-Type"]);
    }
  },
});

/// @brief Export /google_apps_script_proxy AWS Lambda handler
/// @deprecated Use Firebase Functions handler instead, no need to move this to
/// AWS for performance reasons.
/// @hideinitializer
exports.google_apps_script_proxy = serverless(app);
/// @}
