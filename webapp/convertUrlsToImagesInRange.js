// Detect an entry in a cell with a URL beginning with "http://" or "https://"
// Convert it to a formula, "=IMAGE(...)"
// Optionally select a valid low-res image if an Instagram link is detected
// Store the user-provider text in a (hidden) column to the right of this one
function convertUrlsToImagesInRange(providedRange) {
  var sheet = providedRange.getSheet()
  var dataRowsRange = getDataRowsForSheet(sheet.getName())
  var urlsToImagesRange = getRangeIntersection(providedRange, dataRowsRange)

  // Extract the data from the range
  var urlsToImagesData = urlsToImagesRange.getValues()

  // Figure out first, last rows
  var firstRow = Number(urlsToImagesRange.getRow())
  var lastRow = Number(urlsToImagesRange.getNumRows()) + firstRow - 1

  // Figure out first, last columns
  var firstColumn = Number(urlsToImagesRange.getColumn())
  var lastColumn = Number(urlsToImagesRange.getNumColumns()) + firstColumn - 1

  for (var rowNum = firstRow; rowNum <= lastRow; ++rowNum) {
    var rowCells = urlsToImagesData[rowNum - firstRow]

    for (var columnOffset in rowCells) {
      var photoUrl = rowCells[columnOffset]

      if (typeof photoUrl == 'string') {
        var alreadyConverted = photoUrl.indexOf('=IMAGE') != -1
        var isHttpUrl = photoUrl.indexOf('http://') == 0
        var isHttpsUrl = photoUrl.indexOf('https://') == 0

        if (!alreadyConverted && (isHttpUrl || isHttpsUrl)) {
          var isInstagram = photoUrl.indexOf('instagram.com') != -1
          if (isInstagram) {
            photoUrl = getInstagramMediaUrl(photoUrl)
          }

          var showImageInlineFormula = '=IMAGE("' + photoUrl + '",2)'

          var convertUrlColumn = firstColumn + Number(columnOffset)
          var newRowCells = [[showImageInlineFormula]]
          var convertUrlCellRange = sheet.getRange(rowNum, convertUrlColumn)

          convertUrlCellRange.setValues(newRowCells)
        }
      }
    }
  }
}
