function enforceCheckboxValidationsInRange(providedRange) {
  var sheetName = 'Users'
  var sheet = providedRange.getSheet()

  if (sheet.getName() == sheetName) {
    var enforceCheckboxValidationsRange = excludeHeadersFromRange(providedRange)

    var checkboxChoices = ['☐', '☑']
    var allowInvalid = false
    var checkboxColumnRanges = [
      //getNamedRange(sheetName, 'maker_status'),
      getNamedRange(sheetName, 'users_waiver_signed'),
      getNamedRange(sheetName, 'users_permissions')
    ]

    // Create a validation rule ensuring a checkbox provides a dropdown, with 2 possible types
    var checkboxValidationRule = SpreadsheetApp.newDataValidation()
      .requireValueInList(checkboxChoices)
      .setAllowInvalid(allowInvalid)
      .build()

    for (var i = 0; i < checkboxColumnRanges.length; ++i) {
      var checkboxColumnRange = checkboxColumnRanges[i]
      if (checkboxColumnRange) {
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
