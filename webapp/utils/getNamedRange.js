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
