/// @addtogroup scripts
/// @{
/// @file
/// @brief Send an HTML e-mail via Google Apps Script `MailApp`, using provided
/// title, content and footer and generating content from
/// `templates/activity-usage-email.html`. Update provided column index with
/// current timestamp for all rows which were summarized in the e-mail.

/// @brief Send an HTML e-mail via Google Apps Script `MailApp`, using provided
/// title, content and footer and generating content from
/// `templates/activity-usage-email.html`. Update provided column index with
/// current timestamp for all rows which were summarized in the e-mail.
///
/// @param sheet `Sheet` object for "Activity" sheet, to use for updating e-mail
/// sent timestamps.
/// @param activitySummary Object containing activity summary by `MakerLabs ID`.
/// Used to populate the content template and for updating timestamps.
/// @param timestampColumnNum 1-based index of target "Activity" sheet timestamp
/// column.
/// @param emailTo String to use as primary To: address.
/// @param emailCcList String[] listing e-mail addresses to be CC'd.
/// @param emailSubject String to use as subject line.
/// @param emailBodyTitle (optional) String to use as header within the e-mail.
/// @param emailFooter (optional) String to use as e-mail footer.
function sendActivitySummaryEmail(
  sheet,
  activitySummary,
  timestampColumnNum,
  emailTo,
  emailCcList,
  emailSubject,
  emailBodyTitle,
  emailFooter
) {
  Logger.log("Send e-mail to " + emailTo + ", CC: " + emailCcList.join(","));

  var emailTemplate = HtmlService.createTemplateFromFile(
    "templates/activity-usage-email.html"
  );

  emailTemplate.activitySummary = activitySummary;

  var emailContent = emailTemplate.evaluate().getContent();

  var emailSent = sendBrandedEmail(
    emailTo,
    emailCcList,
    emailSubject,
    emailBodyTitle,
    emailContent,
    emailFooter
  );

  if (emailSent) {
    // Mark rows with current timestamp is designated column
    var makerLabsIds = Object.keys(activitySummary);
    for (var i = 0; i < makerLabsIds.length; i++) {
      var makerLabsId = makerLabsIds[i];
      var userActivitySummary = activitySummary[makerLabsId];
      var userActivity = userActivitySummary.activity;

      var machineIds = Object.keys(userActivity);
      for (var j = 0; j < machineIds.length; ++j) {
        var machineId = machineIds[j];
        for (var k = 0; k < userActivity[machineId].length; ++k) {
          var rowNum = userActivity[machineId][k].row;
          var timestampCellRange = sheet.getRange(
            rowNum,
            timestampColumnNum,
            1,
            1
          );
          var now = new Date();
          timestampCellRange.setValues([[now]]);
        }
      }
    }
  }
}
/// @}
