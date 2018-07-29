function viewNextMakerLabsId(req) {
  const makerLabsId = getNextMakerLabsId();
  const jsonContent = JSON.stringify(makerLabsId);

  return ContentService.createTextOutput(jsonContent).setMimeType(
    ContentService.MimeType.JSON
  );
}