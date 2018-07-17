function getDataRowsForSheet(sheetName) {
  // Select the correct spreadsheet (the one this script is attached to)
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(sheetName);

  // Figure out the rows following the frozen rows in this sheet
  var firstRow = Number(sheet.getFrozenRows()) + 1;
  var lastRow = sheet.getMaxRows();

  // Select all columns in the sheet
  var firstColumn = 1;
  var lastColumn = sheet.getMaxColumns();

  // Create a range representing all rows, and all columns (including headers)
  var dataRowsRange = sheet.getRange(
    firstRow,
    firstColumn,
    lastRow,
    lastColumn
  );
  return dataRowsRange;
}
