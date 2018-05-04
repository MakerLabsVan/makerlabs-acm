function getNextMakerLabsId(previousMakerLabsId) {
  var makerLabsIdPrefix = 'ML'
  var maxMakerLabsIdNum = -1

  if (!previousMakerLabsId) {
    var sheetName = 'Users'
    var targetRangeName = 'makerlabs_id'

    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
    var sheet = spreadsheet.getSheetByName(sheetName)
    var namedRanges = sheet.getNamedRanges()

    // Search the list of all possible NamedRanges for the target name
    for (var r in namedRanges) {
      if (namedRanges[r].getName() == targetRangeName) {
        var makerLabsIdColumnRange = namedRanges[r].getRange()
        var makerLabsIdsArray = makerLabsIdColumnRange.getValues()

        for (var i in makerLabsIdsArray) {
          var makerLabsId = makerLabsIdsArray[i][0]
          var validMakerLabsId = makerLabsId.indexOf(makerLabsIdPrefix) == 0
          if (validMakerLabsId) {
            var makerLabsIdNum = Number(
              makerLabsId.substr(makerLabsIdPrefix.length)
            )
            if (makerLabsIdNum > maxMakerLabsIdNum) {
              maxMakerLabsIdNum = makerLabsIdNum
            }
          }
        }
      }
    }
  } else {
    var validMakerLabsId = previousMakerLabsId.indexOf(makerLabsIdPrefix) == 0
    if (validMakerLabsId) {
      maxMakerLabsIdNum = Number(
        previousMakerLabsId.substr(makerLabsIdPrefix.length)
      )
    }
  }

  var nextMakerLabsIdNum = maxMakerLabsIdNum + 1

  // Pad with 00s (e.g. 001.)
  // Does allow extra digits without padding if the number is large enough (e.g. 1000)
  var paddedIdSize = 3 // e.g. 001
  var paddedId = String(nextMakerLabsIdNum)
  while (paddedId.length < paddedIdSize) {
    // Prepend 0 to existing string
    paddedId = '0' + paddedId
  }

  var nextMakerLabsId = 'ML' + paddedId

  return nextMakerLabsId
}
