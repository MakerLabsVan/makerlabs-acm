/// @addtogroup scripts
/// @{
/// @file
/// @brief Given an arbitrary `Range`, return an adjusted range so that no
/// header/frozen rows are included.

/// @brief Given an arbitrary `Range`, return an adjusted range so that no
/// header/frozen rows are included.
///
/// @param fullRange `Range` which may contain header/frozen rows.
///
/// @return The input range adjusted so that no header/frozen rows are included.
function excludeHeadersFromRange(fullRange) {
  // Extract sheet which holds the provided range
  const sheet = fullRange.getSheet();

  // Determine the first non-header row
  const firstNonHeaderRow = Number(sheet.getFrozenRows()) + 1;

  // Determine the first row in the range
  const firstRangeRow = Number(fullRange.getRow());

  // Check if the range includes any headers rows
  if (firstRangeRow < firstNonHeaderRow) {
    // Determine how many rows to offset to get past the headers
    const rowsToOffset = firstNonHeaderRow - firstRangeRow;

    // Remove an according number of rows from the length of the range
    const numRowsAfterOffset = fullRange.getNumRows() - rowsToOffset;

    // Figure out column offsets that select all columns
    const firstColumnOffset = 0;
    const numColumns = Number(fullRange.getNumColumns());

    // Offset the range and return the resulting range
    const excludedRange = fullRange.offset(
      rowsToOffset,
      firstColumnOffset,
      numRowsAfterOffset,
      numColumns
    );

    return excludedRange;
  }

  // Return the input directly, if it didn't include any header rows
  return fullRange;
}
/// @}
