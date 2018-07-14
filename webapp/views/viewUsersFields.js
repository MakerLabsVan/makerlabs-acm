function viewUserFields(req) {
  var fields = getUsersFields();
  var jsonContent = JSON.stringify(fields);
  var jsonpContent = (
    "var acm=window.acm=window.acm||{}; " +
    "acm.userFields = " + jsonContent + "; " +
    req.parameters.callback + "(" + jsonContent + ")"
  );

  return ContentService.createTextOutput(jsonpContent)
    .setMimeType(ContentService.MimeType.JAVASCRIPT);
}