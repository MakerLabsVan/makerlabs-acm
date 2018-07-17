function getRangeIntersection(range1, range2) {
  if (range1.getSheet().getSheetId() === range2.getSheet().getSheetId()) {
    var sheet = range1.getSheet();

    // Determine range1 rows
    var firstRow1 = Number(range1.getRow());
    var lastRow1 = Number(range1.getNumRows()) + firstRow1 - 1;

    // Determine range2 rows
    var firstRow2 = Number(range2.getRow());
    var lastRow2 = Number(range2.getNumRows()) + firstRow2 - 1;

    // Determine range1 columns
    var firstColumn1 = Number(range1.getColumn());
    var lastColumn1 = Number(range1.getNumColumns()) + firstColumn1 - 1;

    // Determine range2 columns
    var firstColumn2 = Number(range2.getColumn());
    var lastColumn2 = Number(range2.getNumColumns()) + firstColumn2 - 1;

    // Determine intersection rows
    var firstRow = Math.max(firstRow1, firstRow2);
    var lastRow = Math.min(lastRow1, lastRow2);
    var numRows = Math.max(0, lastRow - firstRow + 1);

    // Determine intersection columns
    var firstColumn = Math.max(firstColumn1, firstColumn2);
    var lastColumn = Math.min(lastColumn1, lastColumn2);
    var numColumns = Math.max(0, lastColumn - firstColumn + 1);

    // Extract the range and return it
    return sheet.getRange(firstRow, firstColumn, numRows, numColumns);
  }

  // Two ranges in distinct sheets have no valid overlap
  return null;
}
