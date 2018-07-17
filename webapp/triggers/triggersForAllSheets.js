function triggerPopupOnUnsafeChangesOnChange(e) {
  // Popup a popup notification to the user if one of these change types occurs:
  var unsafeChangeTypes = [
    "INSERT_COLUMN",
    "REMOVE_COLUMN",
    //    "OTHER"
  ];

  // Only run on change events
  if (e && e.changeType && unsafeChangeTypes.indexOf(e.changeType) !== -1) {
    return popupOnUnsafeChanges();
  }
}

function triggersForAllSheetsOnChange(e) {
  triggerPopupOnUnsafeChangesOnChange(e);
}
