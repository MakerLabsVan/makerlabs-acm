function viewUserFields(req) {
  var fields = getUsersFields();
  var jsonContent = JSON.stringify(fields);

  return ContentService.createTextOutput(jsonContent)
    .setMimeType(ContentService.MimeType.JSON);
}
