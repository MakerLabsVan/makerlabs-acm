function getTemplateRowForSheet(sheetName) {
  // Select the correct spreadsheet (the one this script is attached to)
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(sheetName);

  // Find the first non-header row
  const firstRow = Number(sheet.getFrozenRows()) + 1;
  const lastRow = firstRow;

  // Use all columns from the template row
  const firstColumn = 1;
  const lastColumn = sheet.getMaxColumns();

  // Create a range representing the full template row
  const templateRowRange = sheet.getRange(
    firstRow,
    firstColumn,
    lastRow,
    lastColumn
  );
  return templateRowRange;
}
