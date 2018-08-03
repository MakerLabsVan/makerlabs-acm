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
