function popupOnUnsafeChanges(e) {
  // Details of toast notification
  const toastTitle = "UNDO that change! Please use ⌘-z ASAP";
  const toastBody = "Unsafe change detected, unexpected ACM results could occur";
  const toastTimeout = 20;

  // Select the correct spreadsheet (the one this script is attached to)
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  spreadsheet.toast(toastBody, toastTitle, toastTimeout);
}
