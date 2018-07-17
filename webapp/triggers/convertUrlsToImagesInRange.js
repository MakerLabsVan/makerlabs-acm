// Detect an entry in a cell with a URL beginning with "http://" or "https://"
// Convert it to a formula, "=IMAGE(...)"
// Optionally select a valid low-res image if an Instagram link is detected
// Store the user-provider text in a (hidden) column to the right of this one
function convertUrlsToImagesInRange(providedRange) {
  const sheet = providedRange.getSheet();
  const dataRowsRange = getDataRowsForSheet(sheet.getName());
  const urlsToImagesRange = getRangeIntersection(providedRange, dataRowsRange);

  // Extract the data from the range
  const urlsToImagesData = urlsToImagesRange.getValues();

  // Figure out first, last rows
  const firstRow = Number(urlsToImagesRange.getRow());
  const lastRow = Number(urlsToImagesRange.getNumRows()) + firstRow - 1;

  // Figure out first, last columns
  const firstColumn = Number(urlsToImagesRange.getColumn());
  const lastColumn =
    Number(urlsToImagesRange.getNumColumns()) + firstColumn - 1;

  for (var rowNum = firstRow; rowNum <= lastRow; ++rowNum) {
    const rowCells = urlsToImagesData[rowNum - firstRow];

    for (var columnOffset in rowCells) {
      var photoUrl = rowCells[columnOffset];

      if (typeof photoUrl === "string") {
        const alreadyConverted = photoUrl.indexOf("=IMAGE") !== -1;
        const isHttpUrl = photoUrl.indexOf("http://") === 0;
        const isHttpsUrl = photoUrl.indexOf("https://") === 0;

        if (!alreadyConverted && (isHttpUrl || isHttpsUrl)) {
          const isInstagram = photoUrl.indexOf("instagram.com") !== -1;
          if (isInstagram) {
            photoUrl = getInstagramMediaUrl(photoUrl);
          }

          const showImageInlineFormula = '=IMAGE("' + photoUrl + '",2)';

          const convertUrlColumn = firstColumn + Number(columnOffset);
          const newRowCells = [[showImageInlineFormula]];
          const convertUrlCellRange = sheet.getRange(rowNum, convertUrlColumn);

          convertUrlCellRange.setValues(newRowCells);
        }
      }
    }
  }
}
