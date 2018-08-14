// Copyright Paul Reimer, 2018
//
// This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 Unported License.
// To view a copy of this license, visit
// https://creativecommons.org/licenses/by-nc-sa/4.0/
// or send a letter to
// Creative Commons, 444 Castro Street, Suite 900, Mountain View, California, 94041, USA.

import 'package:firebase_functions_interop/firebase_functions_interop.dart';
import "package:js/js.dart";
import "package:node_interop/node.dart";

import "package:makerlabs_acm_functions/activity_subscription.dart";
import "package:makerlabs_acm_functions/permissions_check.dart";
import "package:makerlabs_acm_functions/google_apps_script_proxy.dart";

// Establish Dart -> JS module exports
void main() {
  final config = FirebaseFunctions.config;

  setExport("permissions_check", allowInterop(permissions_check));
  setExport("google_apps_script_proxy", allowInterop(google_apps_script_proxy));
  final String activity_topic = config.get("acm.activity_topic");
  if (activity_topic != null) {
    setExport("activity_subscription", allowInterop(activity_subscription));
  }
}
