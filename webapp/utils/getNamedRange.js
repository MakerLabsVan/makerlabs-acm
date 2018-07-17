function getNamedRange(sheetName, namedRangeName) {
  var namedRange = null;

  // Select the correct spreadsheet (the one this script is attached to)
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(sheetName);
  var namedRanges = sheet.getNamedRanges();

  for (var r in namedRanges) {
    if (namedRanges[r].getName() === namedRangeName) {
      namedRange = namedRanges[r].getRange();
    }
  }

  return namedRange;
}
