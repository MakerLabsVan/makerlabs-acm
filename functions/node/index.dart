// Copyright Paul Reimer, 2018
//
// This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 Unported License.
// To view a copy of this license, visit
// https://creativecommons.org/licenses/by-nc-sa/4.0/
// or send a letter to
// Creative Commons, 444 Castro Street, Suite 900, Mountain View, California, 94041, USA.

import 'package:firebase_functions_interop/firebase_functions_interop.dart';

import "package:makerlabs_acm_functions/permissions_check.dart";
import "package:makerlabs_acm_functions/google_apps_script_proxy.dart";

// Establish Dart -> JS module exports
void main() {
  functions["permissions_check"] =
      (FirebaseFunctions.https.onRequest(permissions_check));
  functions["google_apps_script_proxy"] =
      (FirebaseFunctions.https.onRequest(google_apps_script_proxy));
}
