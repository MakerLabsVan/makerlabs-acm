function popupOnUnsafeChanges(e) {
  // Details of toast notification
  var toastTitle = 'UNDO that change! Please use ⌘-z ASAP'
  var toastBody = 'Unsafe change detected, unexpected ACM results could occur'
  var toastTimeout = 20

  // Select the correct spreadsheet (the one this script is attached to)
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  spreadsheet.toast(toastBody, toastTitle, toastTimeout)
}
