function triggerUsersEnforceFormattingOnEdit(e) {
  var sheetName = "Users";

  // Only run on edit events which provide a range
  if (e && e.range && e.range.getSheet().getName() === sheetName) {
    // Only consider Users sheet, exclude the headers from edited range if they were touched
    var editedRange = e.range;
    var enforceFormattingRange = excludeHeadersFromRange(editedRange);

    if (enforceFormattingRange) {
      enforceFormattingInRange(enforceFormattingRange);
    }
  }
}

function triggerUsersEnforceFormattingOnChange(e) {
  var sheetName = "Users";

  // Only run on change events of type "FORMAT" (e.g. clear conditional formatting)
  if (e && e.changeType && e.changeType === "FORMAT") {
    // Re-apply to all Users sheet data rows
    // OnChange event does not provide any info about what changed
    var dataRowsRange = getDataRowsForSheet(sheetName);

    if (dataRowsRange) {
      // TODO: exclude template row from dataRowsRange
      enforceFormattingInRange(dataRowsRange);
    }
  }
}

function triggersForUsersSheetOnEdit(e) {
  triggerUsersEnforceFormattingOnEdit(e);
}

function triggersForUsersSheetOnChange(e) {
  triggerUsersEnforceFormattingOnChange(e);
}
