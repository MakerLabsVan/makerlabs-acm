function enforceFormattingInRange(providedRange) {
  // Select the sheet (the one this range belongs to)
  const sheet = providedRange.getSheet();
  const dataRowsRange = getDataRowsForSheet(sheet.getName());
  const enforceFormattingRange = getRangeIntersection(
    providedRange,
    dataRowsRange
  );

  // Figure out first and last columns
  const firstEditedColumn = Number(enforceFormattingRange.getColumn());
  const lastEditedColumn =
    Number(enforceFormattingRange.getNumColumns()) + firstEditedColumn - 1;
  const numEditedColumns = Number(enforceFormattingRange.getNumColumns());
  const firstEditedColumnOffset = firstEditedColumn - 1;

  // Figure out first and last rows
  const firstEditedRow = Number(enforceFormattingRange.getRow());
  const lastEditedRow =
    Number(enforceFormattingRange.getNumRows()) + firstEditedRow - 1;

  // Extract the row which will serve as the formatting source
  const templateRowRange = getTemplateRowForSheet(sheet.getName());

  // Select only the columns from the template row that have been edited
  const templateRowFormattingRange = templateRowRange.offset(
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
