function getDataRowsForSheet(sheetName) {
  // Select the correct spreadsheet (the one this script is attached to)
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(sheetName);

  // Figure out the rows following the frozen rows in this sheet
  const firstRow = Number(sheet.getFrozenRows()) + 1;
  const lastRow = sheet.getMaxRows();

  // Select all columns in the sheet
  const firstColumn = 1;
  const lastColumn = sheet.getMaxColumns();

  // Create a range representing all rows, and all columns (including headers)
  const dataRowsRange = sheet.getRange(
    firstRow,
    firstColumn,
    lastRow,
    lastColumn
  );
  return dataRowsRange;
}
