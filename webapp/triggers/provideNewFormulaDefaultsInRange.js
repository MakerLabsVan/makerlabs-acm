function provideNewFormulaDefaultsInRange(providedRange) {
  var sheet = providedRange.getSheet()

  // Do not act on header rows
  var provideFormulaRowsRange = excludeHeadersFromRange(providedRange)

  if (provideFormulaRowsRange)
  {
    // Determine the row which will serve as the formatting source
    var templateRowRange = getTemplateRowForSheet(sheet.getName())

    // Extract the formulas from the template row
    var templateFormulas = templateRowRange.getFormulasR1C1()

    // Figure out first and last columns
    var firstEditedColumn = Number(provideFormulaRowsRange.getColumn())
    var numEditedColumns = Number(provideFormulaRowsRange.getNumColumns())
    var firstEditedColumnOffset = firstEditedColumn - 1

    // Figure out first and last rows
    var firstEditedRow = Number(provideFormulaRowsRange.getRow())
    var lastEditedRow =
      Number(provideFormulaRowsRange.getNumRows()) + firstEditedRow - 1
    var numEditedRows = Number(provideFormulaRowsRange.getNumRows())

    // Iterate through columns in provided range
    for (var colIdx = 0; colIdx < numEditedColumns; ++colIdx) {
      var formulaColOffset = firstEditedColumnOffset + colIdx
      var columnFormula = templateFormulas[0][formulaColOffset]
      if (columnFormula) {
        //TODO: why this magic - 2?
        var columnRange = provideFormulaRowsRange.offset(
          0,
          colIdx,
          Math.max(numEditedRows - 2, 0),
          1
        )
        columnRange.setFormulaR1C1(columnFormula)
      }
    }
  }
}
