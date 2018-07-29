function getNextMakerLabsId(previousMakerLabsId) {
  const makerLabsIdPrefix = "ML";
  var maxMakerLabsIdNum = -1;

  if (previousMakerLabsId === null) {
    const sheetName = "Users";
    const targetRangeName = "activity_makerlabs_id";

    const makerLabsIdColumnRange = getNamedRange(sheetName, targetRangeName);

    if (makerLabsIdColumnRange) {
      const makerLabsIdsArray = makerLabsIdColumnRange.getValues();

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

  const nextMakerLabsIdNum = maxMakerLabsIdNum + 1;

  // Pad with 00s (e.g. 001.)
  // Does allow extra digits without padding if the number is large enough (e.g. 1000)
  const paddedIdSize = 3; // E.g. 001
  var paddedId = String(nextMakerLabsIdNum);
  while (paddedId.length < paddedIdSize) {
    // Prepend 0 to existing string
    paddedId = "0" + paddedId;
  }

  const nextMakerLabsId = "ML" + paddedId;

  return nextMakerLabsId;
}