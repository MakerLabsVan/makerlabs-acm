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
/// @brief Write User details to Firebase at provided Database Reference
import "dart:async";

// Dart / Firebase Functions interop
import 'package:firebase_functions_interop/firebase_functions_interop.dart';

// Local packages
import "gen/acm_a_c_m_generated.dart" as ACM;

/// @brief Write User details to Firebase at provided Database Reference
///
/// @param latestUserRef Firebase Database Reference
/// (e.g. `readers/{machineId}/latestUser`)
/// @param user `ACM.User` flatbuffer
///
/// @return Future that completes when write to Firebase Database is done.
Future<void> push_latest_user_to_firebase(
    Reference latestUserRef, ACM.User user) {
  final Map latestUserMap = {
    "name": user.name,
    "email": user.email,
    "makerlabsId": user.makerlabsId,
    "makerStatus": user.makerStatus,
    "tagId": user.tagId,
    "alerts": user.alerts,
    "permissions": user.permissions,
  };

  return latestUserRef.setValue(latestUserMap);
}

/// @}
