/// @addtogroup scripts
/// @{
/// @file
/// @brief Given the name of a sheet within the Google Spreadsheet, return a
/// `Range` which represents the template row (first non-frozen row).

/// @brief Given the name of a sheet within the Google Spreadsheet, return a
/// `Range` which represents the template row (first non-frozen row).
///
/// @param sheetName String representing the name of a target sheet.
///
/// @return `Range` which represents the template row (first non-frozen row) for
/// the given sheetName.
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
/// @}
