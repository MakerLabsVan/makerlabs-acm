function excludeTemplateRowFromRange(fullRange) {
  // Extract sheet which holds the provided range
  var sheet = fullRange.getSheet()

  // Extract the row which will serve as the template
  var templateRowRange = getTemplateRowForSheet(sheet.getName())

  // Determine the last row in the template range
  var templateRow = Number(templateRowRange.getLastRow())

  // Determine the first row in the range
  var firstRangeRow = Number(fullRange.getRow())

  // Check if the range includes any headers rows
  if (firstRangeRow < templateRow) {
    // Determine how many rows to offset to get past the headers
    var rowsToOffset = templateRow - firstRangeRow

    // Remove an according number of rows from the length of the range
    var numRowsAfterOffset = fullRange.getNumRows() - rowsToOffset

    // Figure out column offsets that select all columns
    var firstColumnOffset = 0
    var numColumns = Number(fullRange.getNumColumns())

    // Offset the range and return the resulting range
    var excludedRange = fullRange.offset(
      rowsToOffset,
      firstColumnOffset,
      numRowsAfterOffset,
      numColumns
    )

    return excludedRange
  }

  // Return the input directly, if it didn't include any header rows
  return fullRange
}

