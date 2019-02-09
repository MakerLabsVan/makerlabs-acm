/// @addtogroup scripts
/// @{
/// @file
/// @brief Google Apps Script HTTP handler view which gets the latest fields
/// (using `getUsersFields`), encodes them as a JSON string and produces output
/// suitable for returning directly from the HTTP handler.

/// @brief Google Apps Script HTTP handler view which gets the latest fields
/// (using `getUsersFields`), encodes them as a JSON string and produces output
/// suitable for returning directly from the HTTP handler.
///
/// @param req Google Apps Script HTTP Request event object (unused)
///
/// @return TextOutput object representing the `fields` JSON.
function viewUsersFields(req) {
  const fields = getUsersFields();
  const jsonContent = JSON.stringify(fields);

  return ContentService.createTextOutput(jsonContent).setMimeType(
    ContentService.MimeType.JSON
  );
}
/// @}
