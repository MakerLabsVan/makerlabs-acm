function triggerProvideNewLogRowDefaultsOnChange(e) {
  var sheetName = 'Logs'

  if (e && e.changeType && e.changeType == 'INSERT_ROW') {
    // Only consider Activity sheet data rows
    var logsDataRowsRange = getDataRowsForSheet(sheetName)

    if (logsDataRowsRange) {
      provideNewFormulaDefaultsInRange(logsDataRowsRange)
    }
  }
}
