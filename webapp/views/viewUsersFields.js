function viewUserFields(e) {
  var fields = getUsersFields();
  var jsonContent = JSON.stringify(fields);

  return ContentService.createTextOutput(jsonContent)
    .setMimeType(ContentService.MimeType.JSON);
}
