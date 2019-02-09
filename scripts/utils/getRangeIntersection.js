/// @addtogroup scripts
/// @{
/// @file
/// @brief Given two `Range`s, return their intersection (the rows and columns
/// they share in common).

/// @brief Given two `Range`s, return their intersection (the rows and columns
/// they share in common).
///
/// @param range1 `Range` to check
/// @param range2 `Range` to check
///
/// @return `Range` representing the intersection/overlap of the provided
/// `Range`s
function getRangeIntersection(range1, range2) {
  if (range1.getSheet().getSheetId() === range2.getSheet().getSheetId()) {
    const sheet = range1.getSheet();

    // Determine range1 rows
    const firstRow1 = Number(range1.getRow());
    const lastRow1 = Number(range1.getNumRows()) + firstRow1 - 1;

    // Determine range2 rows
    const firstRow2 = Number(range2.getRow());
    const lastRow2 = Number(range2.getNumRows()) + firstRow2 - 1;

    // Determine range1 columns
    const firstColumn1 = Number(range1.getColumn());
    const lastColumn1 = Number(range1.getNumColumns()) + firstColumn1 - 1;

    // Determine range2 columns
    const firstColumn2 = Number(range2.getColumn());
    const lastColumn2 = Number(range2.getNumColumns()) + firstColumn2 - 1;

    // Determine intersection rows
    const firstRow = Math.max(firstRow1, firstRow2);
    const lastRow = Math.min(lastRow1, lastRow2);
    const numRows = Math.max(0, lastRow - firstRow + 1);

    // Determine intersection columns
    const firstColumn = Math.max(firstColumn1, firstColumn2);
    const lastColumn = Math.min(lastColumn1, lastColumn2);
    const numColumns = Math.max(0, lastColumn - firstColumn + 1);

    // Extract the range and return it
    return sheet.getRange(firstRow, firstColumn, numRows, numColumns);
  }

  // Two ranges in distinct sheets have no valid overlap
  return null;
}
/// @}
