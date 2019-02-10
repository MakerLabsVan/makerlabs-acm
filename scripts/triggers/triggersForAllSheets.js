/// @addtogroup scripts
/// @{
/// @file
/// @brief Trigger functions which apply to all sheets within the Google
/// Spreadsheet.

/// @brief Trigger a popup/toast in the Google Spreadsheet UI when changes in
/// structure (e.g. adding/removing columns) are made.
///
/// Google Apps Script cannot prevent or reverse these changes, so warning the
/// user and requesting they undo is the next best available option.
///
/// @param e Google Apps Script trigger event object
function triggerPopupOnUnsafeChangesOnChange(e) {
  // Popup a popup notification to the user if one of these change types occurs:
  const unsafeChangeTypes = [
    "INSERT_COLUMN",
    "REMOVE_COLUMN",
    //    "OTHER"
  ];

  // Only run on change events
  if (e && e.changeType && unsafeChangeTypes.indexOf(e.changeType) !== -1) {
    popupOnUnsafeChanges();
  }
}

/// @brief Main "onChange" trigger entrypoint for all sheets.
///
/// @param e Google Apps Script trigger event object
function triggersForAllSheetsOnChange(e) {
  triggerPopupOnUnsafeChangesOnChange(e);
}
/// @}
