/// @addtogroup scripts
/// @{
/// @file
/// @brief Google Apps Script HTTP handler view which searches the "Users" sheet
/// for the next available `MakerLabs ID` (using `getNextMakerLabsId`), encodes
/// it as a JSON string and produces output suitable for returning directly
/// from the HTTP handler.

/// @brief Google Apps Script HTTP handler view which searches the "Users" sheet
/// for the next available `MakerLabs ID` (using `getNextMakerLabsId`), encodes
/// it as a JSON string and produces output suitable for returning directly
/// from the HTTP handler.
///
/// @param req Google Apps Script HTTP Request event object (unused)
///
/// @return TextOutput object representing the next `MakerLabs ID` string in
/// JSON.
function viewNextMakerLabsId(req) {
  const makerLabsId = getNextMakerLabsId();
  const jsonContent = JSON.stringify(makerLabsId);

  return ContentService.createTextOutput(jsonContent).setMimeType(
    ContentService.MimeType.JSON
  );
}
/// @}
