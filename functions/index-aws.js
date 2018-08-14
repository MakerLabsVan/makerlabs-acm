// Copyright Paul Reimer, 2018
//
// This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 Unported License.
// To view a copy of this license, visit
// https://creativecommons.org/licenses/by-nc-sa/4.0/
// or send a letter to
// Creative Commons, 444 Castro Street, Suite 900, Mountain View, California, 94041, USA.

// Express server to run Google Cloud Function handler
const express = require("express");
// Express middleware to wrap (req,res) handlers as an AWS Lambda handler
const serverless = require("serverless-http");
// Express middleware to provide the full request body in a req.body field
const bodyParser = require("body-parser");

// (req,res)-style Dart handlers
const index = require("./build/node/index.dart.js");

// Setup Express server to run (req,res)-style Dart handlers
const app = express();
// Provide request body as raw binary Buffer
app.use(bodyParser.raw());

// Add routing for (req,res)-style Dart handlers
app.post("/permissions_check", (req, res) => {
  index.permissions_check(req, res);
});
app.post("/google_apps_script_proxy", (req, res) => {
  index.google_apps_script_proxy(req, res);
});

// Re-export the Express server wrapped as an AWS Lambda-compatible handler
exports.permissions_check = serverless(app, {
  request: (request, event, context) => {
    // Pass Authorization header to lambda if it was provided
    if (event && event.headers && event.headers.Authorization) {
      request.headers.Authorization = event.headers.Authorization;
      request.rawHeaders.push("Authorization", event.headers.Authorization);
    }
  },
});
