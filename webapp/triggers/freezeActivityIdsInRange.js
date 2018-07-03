function freezeActivityIdsInRange(providedRange) {
  var sheetName = 'Activity'
  var sheet = providedRange.getSheet()

  if (sheet.getName() == sheetName) {
    // Do not act on header rows
    var freezeActivityRowsRange = excludeHeadersFromRange(providedRange)

    // Only freeze specific named range
    var targetRangeName = 'activity_makerlabs_id'
    var makerLabsIdColumnRange = getNamedRange(sheetName, targetRangeName)

    // Extract the correct column(s) for the changed rows
    var freezeActivityIdsRange = getRangeIntersection(
      freezeActivityRowsRange,
      makerLabsIdColumnRange
    )

    // Copy the values (possibly from formulas), write back as values
    freezeActivityIdsRange.copyTo(freezeActivityIdsRange, { contentsOnly: true })
  }
}
