// Copyright Paul Reimer, 2018
//
// This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 Unported License.
// To view a copy of this license, visit
// https://creativecommons.org/licenses/by-nc-sa/4.0/
// or send a letter to
// Creative Commons, 444 Castro Street, Suite 900, Mountain View, California, 94041, USA.

import "package:js/js.dart";
import "package:node_interop/node.dart";

import "package:makerlabs_acm_functions/permissions_check.dart";

// Establish Dart -> JS module exports
void main() {
  setExport("permissions_check", allowInterop(permissions_check));
}
