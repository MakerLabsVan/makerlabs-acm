function enforceFormattingInRange(providedRange) {
  // Select the sheet (the one this range belongs to)
  var sheet = providedRange.getSheet();
  var dataRowsRange = getDataRowsForSheet(sheet.getName());
  var enforceFormattingRange = getRangeIntersection(
    providedRange,
    dataRowsRange
  );

  // Figure out first and last columns
  var firstEditedColumn = Number(enforceFormattingRange.getColumn());
  var lastEditedColumn =
    Number(enforceFormattingRange.getNumColumns()) + firstEditedColumn - 1;
  var numEditedColumns = Number(enforceFormattingRange.getNumColumns());
  var firstEditedColumnOffset = firstEditedColumn - 1;

  // Figure out first and last rows
  var firstEditedRow = Number(enforceFormattingRange.getRow());
  var lastEditedRow =
    Number(enforceFormattingRange.getNumRows()) + firstEditedRow - 1;

  // Extract the row which will serve as the formatting source
  var templateRowRange = getTemplateRowForSheet(sheet.getName());

  // Select only the columns from the template row that have been edited
  var templateRowFormattingRange = templateRowRange.offset(
    0,
    firstEditedColumnOffset,
    1,
    numEditedColumns
  );

  // Copy formatting to rest of users
  templateRowFormattingRange.copyFormatToRange(
    sheet,
    firstEditedColumn,
    lastEditedColumn,
    firstEditedRow,
    lastEditedRow
  );
}
