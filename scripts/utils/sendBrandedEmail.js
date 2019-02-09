/// @addtogroup scripts
/// @{
/// @file
/// @brief Send an HTML e-mail via Google Apps Script `MailApp`, using provided
/// title, content and footer.

/// @brief Send an HTML e-mail via Google Apps Script `MailApp`, using provided
/// title, content and footer.
///
/// @param emailTo String to use as primary To: address.
/// @param emailCcList String[] listing e-mail addresses to be CC'd.
/// @param emailSubject String to use as subject line.
/// @param emailBodyTitle (optional) String to use as header within the e-mail.
/// @param emailContent (optional) String to use as e-mail content.
/// @param emailFooter (optional) String to use as e-mail footer.
///
/// @return `True` if an e-mail was sent (or attempted).
function sendBrandedEmail(
  emailTo,
  emailCcList,
  emailSubject,
  emailBodyTitle,
  emailContent,
  emailFooter
) {
  Logger.log(MailApp.getRemainingDailyQuota());
  /// (Check the `MailApp.getRemainingDailyQuota()`, exit early if the quota is
  /// exhausted.)
  if (MailApp.getRemainingDailyQuota() > 0) {
    /// - Fetch MakerLabs logo from SquareSpace, create a named `Blob` so the
    /// image can be embedded in an e-mail directly.
    var logoUrl =
      "https://static1.squarespace.com/static/5363f32ee4b0ebb1a7c84772/t/5643c511e4b024d1dbec1da9/1533096162821/?format=100w";
    var logoBlob = UrlFetchApp
      .fetch(logoUrl)
      .getBlob()
      .setName("logoBlob");

    /// - Use the `templates/branded-email.html` template.
    var brandedEmailTemplate = HtmlService.createTemplateFromFile(
      "templates/branded-email.html"
    );

    /// - Set the fields on the template to the provided values:
    /// {`emailBodyTitle`, `emailContent`, `emailFooter`}
    brandedEmailTemplate.hasLogo = true;
    brandedEmailTemplate.emailBodyTitle = emailBodyTitle;
    brandedEmailTemplate.emailContent = emailContent;
    brandedEmailTemplate.emailFooter = emailFooter;

    /// - Render the template to a single String
    var finalEmailContent = brandedEmailTemplate.evaluate().getContent();
    Logger.log(emailContent);

    /// - Attempt to send the e-mail
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
/// @}
