/// @addtogroup scripts
/// @{
/// @file
/// @brief Return the `Range` corresponding to the specified `NamedRange` name
/// in a specific Google Spreadsheet sheet name.

/// @brief Return the `Range` corresponding to the specified `NamedRange` name
/// in a specific Google Spreadsheet sheet name.
///
/// @param sheetName String of the target Google Spreadsheet sheet name.
/// @param namedRangeName String of the target `NamedRange` within the sheet.
///
/// @return `Range` object representing the contents of the named range.
function getNamedRange(sheetName, namedRangeName) {
  var namedRange = null;

  // Select the correct spreadsheet (the one this script is attached to)
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(sheetName);
  const namedRanges = sheet.getNamedRanges();

  for (var r in namedRanges) {
    if (namedRanges[r].getName() === namedRangeName) {
      namedRange = namedRanges[r].getRange();
    }
  }

  return namedRange;
}
/// @}
