function triggerActivitySendUsageEmails(e) {
  //  const sheetName = "Activity";
  const sheetName = "Activity, De-duped";

  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(sheetName);

  const usageEmailSentTimeColumnRange = getNamedRange(
    sheetName,
    "activity_usage_email_sent_time"
  );
  const usageEmailSentTimeDataRowsRange = excludeHeadersFromRange(
    usageEmailSentTimeColumnRange
  );
  const timestampColumnNum = usageEmailSentTimeColumnRange.getColumn();

  const firstEmptyRow = getFirstEmptyRow(usageEmailSentTimeDataRowsRange);

  if (firstEmptyRow) {
    const activityRowsToCheckRange = sheet.getRange(
      firstEmptyRow,
      1,
      sheet.getMaxRows() - firstEmptyRow + 1,
      sheet.getMaxColumns()
    );

    const batchSize = 1000;
    const activityFilter = {
      "Usage Email Sent Time": "",
      "Activity Type": "CNC_Job",
    };
    const activityByUser = getActivitySummaryByUser(
      activityRowsToCheckRange,
      batchSize,
      activityFilter
    );

    var emailTo = "";
    const emailSubject = "MakerLabs Activity / Machine Usage Notification";
    const emailBodyTitle = "Thanks For Making With Us!";
    const emailCcList = ["hello@makerlabs.com"];
    var emailFooterTemplate = HtmlService.createTemplateFromFile(
      "templates/thank-you-footer.html"
    );
    var emailFooter = emailFooterTemplate.evaluate().getContent();

    if (activityByUser) {
      var makerLabsIds = Object.keys(activityByUser);
      for (var i = 0; i < makerLabsIds.length; ++i) {
        var makerLabsId = makerLabsIds[i];
        var activityForThisUser = {};
        activityForThisUser[makerLabsId] = activityByUser[makerLabsId];
        emailTo = activityForThisUser[makerLabsId].hasOwnProperty("Email")
          ? activityForThisUser[makerLabsId]["Email"]
          : "";
        sendActivitySummaryEmail(
          sheet,
          activityForThisUser,
          timestampColumnNum,
          emailTo,
          emailCcList,
          emailSubject,
          emailBodyTitle,
          emailFooter
        );
      }
    }
  }
}

function triggerActivitySendBillingEmails(e) {
  //  const sheetName = "Activity";
  const sheetName = "Activity, De-duped";

  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(sheetName);

  const billingEmailSentTimeColumnRange = getNamedRange(
    sheetName,
    "activity_billing_email_sent_time"
  );
  const billingEmailSentTimeDataRowsRange = excludeHeadersFromRange(
    billingEmailSentTimeColumnRange
  );
  const timestampColumnNum = billingEmailSentTimeColumnRange.getColumn();
  const firstEmptyRow = getFirstEmptyRow(billingEmailSentTimeDataRowsRange);

  if (firstEmptyRow) {
    const activityRowsToCheckRange = sheet.getRange(
      firstEmptyRow,
      1,
      sheet.getMaxRows() - firstEmptyRow + 1,
      sheet.getMaxColumns()
    );

    // Advance timestamp to next Monday
    var nextMonday = new Date();
    nextMonday.setDate(
      nextMonday.getDate() + ((1 + 7 - nextMonday.getDay()) % 7)
    );
    // Date part only
    nextMonday.setHours(0, 0, 0, 0);

    const batchSize = 1000;
    const activityFilter = {
      "Billing Email Sent Time": "",
      "Activity Type": "CNC_Job",
      "Group Billing Week": nextMonday,
    };
    const activityByUser = getActivitySummaryByUser(
      activityRowsToCheckRange,
      batchSize,
      activityFilter
    );

    const emailTo = "hello@makerlabs.com";
    const emailSubject = "Weekly Member Billing For Machine Usage";
    const emailBodyTitle = "Weekly Member Billing For Machine Usage";
    const emailCcList = [];

    var emailFooter = null;

    if (activityByUser && Object.keys(activityByUser).length) {
      sendActivitySummaryEmail(
        sheet,
        activityByUser,
        timestampColumnNum,
        emailTo,
        emailCcList,
        emailSubject,
        emailBodyTitle,
        emailFooter
      );
    }
  }
}
