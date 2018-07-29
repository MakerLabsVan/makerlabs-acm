function viewUsersFields(req) {
  const fields = getUsersFields();
  const jsonContent = JSON.stringify(fields);

  return ContentService.createTextOutput(jsonContent).setMimeType(
    ContentService.MimeType.JSON
  );
}