/// @addtogroup scripts
/// @{
/// @file
/// @brief Trigger functions which affect the "Users" sheet.

/// @brief Inspect rows within provided `Range`, ensure it is for the "Users"
/// sheet, limit range to data-rows only, and apply the formatting from the
/// "Users" template row (first non-frozen row).
///
/// @param e Google Apps Script trigger event object
function triggerUsersEnforceFormattingOnEdit(e) {
  const sheetName = "Users";

  /// (Only run on edit events which provide a range)
  if (e && e.range && e.range.getSheet().getName() === sheetName) {
    /// (Only consider Users sheet, exclude the headers from edited range if
    /// they were touched)
    const editedRange = e.range;
    const enforceFormattingRange = excludeHeadersFromRange(editedRange);

    if (enforceFormattingRange) {
      enforceFormattingInRange(enforceFormattingRange);
    }
  }
}

/// @brief Inspect data rows (all non-frozen rows) from the "Users" sheet and
/// apply the formatting from the "Users" template row (first non-frozen row).
///
/// @param e Google Apps Script trigger event object
function triggerUsersEnforceFormattingOnChange(e) {
  const sheetName = "Users";

  /// (Only run on change events of type "FORMAT" (e.g. clear conditional
  /// formatting))
  if (e && e.changeType && e.changeType === "FORMAT") {
    // Re-apply to all Users sheet data rows
    // OnChange event does not provide any info about what changed
    const dataRowsRange = getDataRowsForSheet(sheetName);

    if (dataRowsRange) {
      // TODO: exclude template row from dataRowsRange
      enforceFormattingInRange(dataRowsRange);
    }
  }
}

/// @brief Main "onEdit" trigger entrypoint for "Users" sheet.
///
/// @param e Google Apps Script trigger event object
function triggersForUsersSheetOnEdit(e) {
  triggerUsersEnforceFormattingOnEdit(e);
}

/// @brief Main "onChange" trigger entrypoint for "Users" sheet.
///
/// @param e Google Apps Script trigger event object
function triggersForUsersSheetOnChange(e) {
  triggerUsersEnforceFormattingOnChange(e);
}
/// @}
