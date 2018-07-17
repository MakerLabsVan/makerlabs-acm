function getTemplateRowForSheet(sheetName) {
  // Select the correct spreadsheet (the one this script is attached to)
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(sheetName);

  // Find the first non-header row
  var firstRow = Number(sheet.getFrozenRows()) + 1;
  var lastRow = firstRow;

  // Use all columns from the template row
  var firstColumn = 1;
  var lastColumn = sheet.getMaxColumns();

  // Create a range representing the full template row
  var templateRowRange = sheet.getRange(
    firstRow,
    firstColumn,
    lastRow,
    lastColumn
  );
  return templateRowRange;
}
