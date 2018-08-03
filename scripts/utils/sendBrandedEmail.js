function sendBrandedEmail(
  emailTo,
  emailCcList,
  emailSubject,
  emailBodyTitle,
  emailContent,
  emailFooter
) {
  Logger.log(MailApp.getRemainingDailyQuota());
  if (MailApp.getRemainingDailyQuota() > 0) {
    var logoUrl =
      "https://static1.squarespace.com/static/5363f32ee4b0ebb1a7c84772/t/5643c511e4b024d1dbec1da9/1533096162821/?format=100w";
    var logoBlob = UrlFetchApp
      .fetch(logoUrl)
      .getBlob()
      .setName("logoBlob");

    var brandedEmailTemplate = HtmlService.createTemplateFromFile(
      "templates/branded-email.html"
    );

    brandedEmailTemplate.hasLogo = true;
    brandedEmailTemplate.emailBodyTitle = emailBodyTitle;
    brandedEmailTemplate.emailContent = emailContent;
    brandedEmailTemplate.emailFooter = emailFooter;

    var finalEmailContent = brandedEmailTemplate.evaluate().getContent();
    Logger.log(emailContent);

    MailApp.sendEmail({
      to: emailTo,
      cc: emailCcList.join(","),
      subject: emailSubject,
      htmlBody: finalEmailContent,
      inlineImages: {
        logo: logoBlob
      },
    });

    return true;
  }

  return false;
}
