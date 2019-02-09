/// @addtogroup scripts
/// @{
/// @file
/// @brief Search the provided `Range` for the first row which has no data in
/// all columns from the range, and return the index of that row.

/// @brief Search the provided `Range` for the first row which has no data in
/// all columns from the range, and return the index of that row.
///
/// @param range `Range` which should be checked for empty row (at least all
/// columns in range begin empty)
///
/// @return 1-based index of first empty row, or `null` if all rows have data.
function getFirstEmptyRow(range) {
  const batchSize = 10;
  if (range) {
    const numRows = Number(range.getNumRows());
    const numColumns = Number(range.getNumColumns());

    // Iterate through the rows in batches
    for (
      var currentRowIdx = 0;
      currentRowIdx < numRows;
      currentRowIdx += batchSize
    ) {
      var thisBatchSize = batchSize;

      // Adjust size if outside bounds
      if (currentRowIdx + thisBatchSize > numRows) {
        thisBatchSize = numRows - currentRowIdx;
      }

      var batchRange = range.offset(
        currentRowIdx,
        0,
        thisBatchSize,
        numColumns
      );
      var values = batchRange.getValues();

      // Iterate through the batch rows
      for (var row = 0; row < batchRange.getNumRows(); ++row) {
        var rowHasData = false;
        // Iterate through this row's columns
        for (var col = 0; col < batchRange.getNumColumns(); ++col) {
          // Skip this row if any data is present
          if (values[row][col] != "") {
            rowHasData = true;
          }
        }

        // If all columns were empty, return that row
        if (!rowHasData) {
          // Figure out first, last rows
          const firstRow = Number(range.getRow());
          const lastRow = numRows + firstRow - 1;

          var firstEmptyRow = firstRow + currentRowIdx + row;
          // Only consider the first empty row if it occurred before the end
          if (firstEmptyRow <= lastRow) {
            return firstEmptyRow;
          }
        }
      }
    }
  }

  return null;
}
/// @}
