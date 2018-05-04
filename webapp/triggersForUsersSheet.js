// Detect an entry in a cell with a URL beginning with "http://" or "https://"
// Convert it to a formula, "=IMAGE(...)"
// Optionally select a valid low-res image if an Instagram link is detected
// Store the user-provider text in a (hidden) column to the right of this one
function triggerConvertUrlsToImagesOnEdit(e) {
  var sheetName = 'Users'

  // Only run on edit events which provide a range
  if (e && e.range && e.range.getSheet().getName() == sheetName) {
    // Only consider edited ranges that have touched the Users sheet photo column
    var editedRange = e.range
    var userPhotosRange = getUserPhotosRange()
    var convertUrlsToImagesRange = getRangeIntersection(
      editedRange,
      userPhotosRange
    )

    if (convertUrlsToImagesRange) {
      convertUrlsToImagesInRange(convertUrlsToImagesRange)
    }
  }
}

function triggerResizeUserRowsHeightOnChange(e) {
  var sheetName = 'Users'

  // Only run on change events of type "OTHER" (e.g. column resize)
  if (e && e.changeType && e.changeType == 'OTHER') {
    // Re-apply to the Users sheet rows, selecting only the photo column
    // OnChange event does not provide any info about what changed
    var userPhotosRange = getUserPhotosRange()

    if (userPhotosRange) {
      resizeRowHeightInRange(userPhotosRange)
    }
  }
}

function triggerEnforceFormattingOnEdit(e) {
  var sheetName = 'Users'

  // Only run on edit events which provide a range
  if (e && e.range && e.range.getSheet().getName() == sheetName) {
    // Only consider Users sheet, exclude the headers from edited range if they were touched
    var editedRange = e.range
    var enforceFormattingRange = excludeHeadersFromRange(editedRange)

    if (enforceFormattingRange) {
      enforceFormattingInRange(enforceFormattingRange)
    }
  }
}

function triggerEnforceFormattingOnChange(e) {
  var sheetName = 'Users'

  // Only run on change events of type "FORMAT" (e.g. clear conditional formatting)
  if (e && e.changeType && e.changeType == 'FORMAT') {
    // Re-apply to all Users sheet data rows
    // OnChange event does not provide any info about what changed
    var dataRowsRange = getDataRowsForSheet(sheetName)

    if (dataRowsRange) {
      //TODO: exclude template row from dataRowsRange
      enforceFormattingInRange(dataRowsRange)
    }
  }
}

function triggerEnforceCheckboxValidationsOnEdit(e) {
  var sheetName = 'Users'

  // Only run on edit events which provide a range
  if (e && e.range && e.range.getSheet().getName() == sheetName) {
    // Only consider Users sheet, exclude the headers from edited range if they were touched
    var editedRange = e.range
    var enforceCheckboxValidationsRange = excludeHeadersFromRange(editedRange)

    if (enforceCheckboxValidationsRange) {
      enforceCheckboxValidationsInRange(enforceCheckboxValidationsRange)
    }
  }
}

function triggerEnforceCheckboxValidationsOnChange(e) {
  var sheetName = 'Users'

  // Only run on change events of type "OTHER" (e.g. data validation removal)
  if (e && e.changeType && e.changeType == 'OTHER') {
    // Re-apply to all Users sheet data rows
    // OnChange event does not provide any info about what changed
    var dataRowsRange = getDataRowsForSheet(sheetName)

    if (dataRowsRange) {
      //TODO: exclude template row from dataRowsRange
      enforceCheckboxValidationsInRange(dataRowsRange)
    }
  }
}
