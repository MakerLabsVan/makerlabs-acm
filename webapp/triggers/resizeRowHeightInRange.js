function resizeRowHeightInRange(providedRange, ratio) {
  // Select a default ratio if not provided
  ratio = ratio || 1.0

  // Extract the sheet from the provided range
  var sheet = providedRange.getSheet()

  // Figure out which column is used, extract the current column width
  var columnNum = providedRange.getColumn()
  var columnWidth = sheet.getColumnWidth(columnNum)

  // Exclude the headers from the provided range
  var resizeRowsRange = excludeHeadersFromRange(providedRange)

  // Figure out which rows should be resized
  var firstRow = resizeRowsRange.getRow()
  var lastRow = Number(resizeRowsRange.getNumRows()) + firstRow - 1

  for (var rowNum = firstRow; rowNum <= lastRow; ++rowNum) {
    if (sheet.getRowHeight(rowNum) != columnWidth) {
      sheet.setRowHeight(rowNum, columnWidth)
    }
  }
}
