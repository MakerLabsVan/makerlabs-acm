function viewUserPage(e) {
  var sheetName = 'Users'

  var appTemplateFilename = 'views/view-user-page.html'
  var appTpl = HtmlService.createTemplateFromFile(appTemplateFilename)

  // Pass any provided URL parameters to template
  appTpl.initialQuery = JSON.stringify(e.parameters)

  var fields = getUsersFields();
  appTpl.fields = JSON.stringify(fields)

  return appTpl
    .evaluate()
    .setSandboxMode(HtmlService.SandboxMode.IFRAME)
    .setTitle('MakerLabs ACM Test')
}
