function getUsersFields() {
  var sheetName = 'Users'

  // Populate list of fields
  var usersSectionHeadersRange = getNamedRange(sheetName, 'users_section_headers')
  var usersColumnHeadersRange = getNamedRange(sheetName, 'users_column_headers')
  var usersTemplateRowRange = getNamedRange(sheetName, 'users_template_row')

  var sections = usersSectionHeadersRange.getValues()[0]
  var columns = usersColumnHeadersRange.getValues()[0]
  var validations = usersTemplateRowRange.getDataValidations()[0]

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

  return fields;
}
