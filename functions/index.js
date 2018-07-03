// Copyright Paul Reimer, 2018
//
// This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 Unported License.
// To view a copy of this license, visit
// https://creativecommons.org/licenses/by-nc-sa/4.0/
// or send a letter to
// Creative Commons, 444 Castro Street, Suite 900, Mountain View, California, 94041, USA.

// Dart JS Entrypoint
const {permissions_check} = require("./build/node/index.dart.js");

exports.permissions_check = (req, res, next) => {
  // Early exit for external ping check to keep function "warm"
  if (req.query && "ping" in req.query) {
    res.status(200).end();
    return;
  }

  permissions_check(req, res);
};
