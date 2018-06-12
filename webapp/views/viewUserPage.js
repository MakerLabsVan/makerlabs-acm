// http://cwestblog.com/2013/09/05/javascript-snippet-convert-number-to-column-name/
function toColumnName(num) {
  for (var ret = '', a = 1, b = 26; (num -= a) >= 0; a = b, b *= 26) {
    ret = String.fromCharCode(parseInt((num % b) / a) + 65) + ret
  }
  return ret
}

function doGet(e) {
  var sheetName = 'Users'

  var appTemplateFilename = 'views/index.html'
  var appTpl = HtmlService.createTemplateFromFile(appTemplateFilename)

  // Pass any provided URL parameters to template
  appTpl.initialQuery = JSON.stringify(e.parameters)

  // Populate list of fields
  var sectionHeadersRange = getNamedRange(sheetName, 'user_section_headers')
  var columnHeadersRange = getNamedRange(sheetName, 'user_column_headers')
  var templateRowRange = getNamedRange(sheetName, 'user_template_row')

  var sections = sectionHeadersRange.getValues()[0]
  var columns = columnHeadersRange.getValues()[0]
  var validations = templateRowRange.getDataValidations()[0]

  var fields = []
  var section = null
  for (var i = 0; i < columns.length; ++i) {
    if (sections[i]) {
      if (section && section.fields) {
        fields.push(JSON.parse(JSON.stringify(section)))
      }
      section = {
        title: sections[i],
        fields: []
      }
    }

    if (section) {
      var name = toColumnName(i + 1)
      var title = columns[i]
      var validation = validations[i]
      var type = validation && validation.getCriteriaType().toString()

      section.fields.push({
        name: name,
        title: title,
        type: type,
        values: validation && validation.getCriteriaValues(),
        choices:
          type == SpreadsheetApp.DataValidationCriteria.VALUE_IN_LIST &&
          validation.getCriteriaValues()[0]
      })
    }
  }

  // Add the final section
  if (section && section.fields) {
    fields.push(JSON.parse(JSON.stringify(section)))
  }

  appTpl.fields = JSON.stringify(fields)

  return appTpl
    .evaluate()
    .setSandboxMode(HtmlService.SandboxMode.IFRAME)
    .setTitle('MakerLabs ACM Test')
}
