import "dart:async";

// Google APIs (Sheets)
import "package:googleapis/sheets/v4.dart";

// Local packages
import "gen/acm_a_c_m_generated.dart" as ACM;

Future append_activity_to_spreadsheet(SheetsApi sheets, String spreadsheetId,
    String sheetName, ACM.Activity activity, ACM.User user) {
  final String activityTypeStr =
      (activity.activityType == ACM.ActivityType.Signed_In
          ? "Signed_In"
          : activity.activityType == ACM.ActivityType.Signed_Out
              ? "Signed_Out"
              : activity.activityType == ACM.ActivityType.CNC_Job
                  ? "CNC_Job"
                  : "Unknown");

  // Insert a sample Activity row
  final List<List<Object>> values = [
    [
      activity.time,
      activity.machineId,
      activityTypeStr,
      activity.usageSeconds,
      activity.tagId,
      user?.makerlabsId,
      user?.makerStatus,
    ]
  ];

  final ValueRange valueRange = new ValueRange()
    ..range = sheetName
    ..values = values;

  return sheets.spreadsheets.values.append(
    valueRange,
    spreadsheetId,
    sheetName,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
  );
}
