function triggerProvideNewActivityRowDefaultsOnEdit(e) {
  var sheetName = 'Activity'

  // Only consider events that provide a range
  if (e && e.range && e.range.getSheet().getName() == sheetName) {
    // Only consider Activity sheet, exclude the headers from edited range if they were touched
    var editedRange = e.range
    var newActivityRange = excludeHeadersFromRange(editedRange)

    var sheet = editedRange.getSheet()

    // Figure out first and last columns for the entire row
    var firstColumn = 1
    var lastColumn = Number(sheet.getMaxColumns())
    var numColumns = lastColumn - firstColumn + 1

    // Figure out first and last rows, avoid processing headers
    var firstEditedRow = Number(newActivityRange.getRow())
    var lastEditedRow =
      Number(newActivityRange.getNumRows()) + firstEditedRow - 1
    var numEditedRows = Number(newActivityRange.getNumRows())

    var provideNewActivityRowDefaultsRange = sheet.getRange(
      firstEditedRow,
      firstColumn,
      numEditedRows,
      numColumns
    )

    if (provideNewActivityRowDefaultsRange) {
      provideNewFormulaDefaultsInRange(provideNewActivityRowDefaultsRange)
    }
  }
}

function triggerProvideNewActivityRowDefaultsOnChange(e) {
  var sheetName = 'Activity'

  if (e && e.changeType && e.changeType == 'INSERT_ROW') {
    // Only consider Activity sheet data rows
    var activityDataRowsRange = getDataRowsForSheet(sheetName)

    if (activityDataRowsRange) {
      provideNewFormulaDefaultsInRange(activityDataRowsRange)
    }
  }
}
