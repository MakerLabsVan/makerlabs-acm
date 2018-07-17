function getNextMakerLabsId(previousMakerLabsId) {
  var makerLabsIdPrefix = "ML";
  var maxMakerLabsIdNum = -1;

  if (previousMakerLabsId === null) {
    var sheetName = "Users";
    var targetRangeName = "activity_makerlabs_id";

    var makerLabsIdColumnRange = getNamedRange(sheetName, targetRangeName);

    if (makerLabsIdColumnRange) {
      var makerLabsIdsArray = makerLabsIdColumnRange.getValues();

      for (var i in makerLabsIdsArray) {
        var makerLabsId = makerLabsIdsArray[i][0];
        var validMakerLabsId = makerLabsId.indexOf(makerLabsIdPrefix) === 0;
        if (validMakerLabsId) {
          var makerLabsIdNum = Number(
            makerLabsId.substr(makerLabsIdPrefix.length)
          );
          if (makerLabsIdNum > maxMakerLabsIdNum) {
            maxMakerLabsIdNum = makerLabsIdNum;
          }
        }
      }
    }
  } else if (previousMakerLabsId.indexOf(makerLabsIdPrefix) === 0) {
    maxMakerLabsIdNum = Number(
      previousMakerLabsId.substr(makerLabsIdPrefix.length)
    );
  }

  var nextMakerLabsIdNum = maxMakerLabsIdNum + 1;

  // Pad with 00s (e.g. 001.)
  // Does allow extra digits without padding if the number is large enough (e.g. 1000)
  var paddedIdSize = 3; // E.g. 001
  var paddedId = String(nextMakerLabsIdNum);
  while (paddedId.length < paddedIdSize) {
    // Prepend 0 to existing string
    paddedId = "0" + paddedId;
  }

  var nextMakerLabsId = "ML" + paddedId;

  return nextMakerLabsId;
}
