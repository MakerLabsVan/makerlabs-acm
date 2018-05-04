function enforceCheckboxValidationsInRange(providedRange) {
  var sheetName = 'Users'

  var sheet = providedRange.getSheet()
  var dataRowsRange = getDataRowsForSheet(sheet.getName())
  var enforceCheckboxValidationsRange = getRangeIntersection(
    providedRange,
    dataRowsRange
  )

  var checkboxChoices = ['☐', '☑']
  var allowInvalid = false
  var namedRangeNames = [
    //    "maker_status",
    'waiver_signed',
    'permissions'
  ]

  // Create a validation rule ensuring a checkbox provides a dropdown, with 2 possible types
  var checkboxValidationRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(checkboxChoices)
    .setAllowInvalid(allowInvalid)
    .build()

  if (sheet.getName() == sheetName) {
    var namedRanges = sheet.getNamedRanges()

    // Apply the validation rule to changed rows in all of the matching NamedRanges
    for (var targetRangeName in namedRangeNames) {
      var namedRangeName = namedRangeNames[targetRangeName]

      // Search the list of all possible NamedRanges for the selected name
      for (var r in namedRanges) {
        if (namedRanges[r].getName() == namedRangeName) {
          // Extract the whole column from the NamedRange
          var checkboxColumnRange = namedRanges[r].getRange()

          // Create a range representing the edited cells that require validation
          var checkboxRange = getRangeIntersection(
            enforceCheckboxValidationsRange,
            checkboxColumnRange
          )

          // Apply the validation rule to the whole (sub)range
          checkboxRange.setDataValidation(checkboxValidationRule)
        }
      }
    }
  }
}
