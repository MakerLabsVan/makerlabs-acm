function getUsersFields() {
  const sheetName = "Users";

  // Populate list of fields
  const usersSectionHeadersRange = getNamedRange(
    sheetName,
    "users_section_headers"
  );
  const usersColumnHeadersRange = getNamedRange(
    sheetName,
    "users_column_headers"
  );
  const usersTemplateRowRange = getNamedRange(sheetName, "users_template_row");

  const sections = usersSectionHeadersRange.getValues()[0];
  const columns = usersColumnHeadersRange.getValues()[0];
  const validations = usersTemplateRowRange.getDataValidations()[0];

  const fields = [];
  var section = null;
  for (var i = 0; i < columns.length; ++i) {
    if (sections[i]) {
      if (section && section.fields) {
        fields.push(JSON.parse(JSON.stringify(section)));
      }
      section = {
        title: sections[i],
        fields: [],
      };
    }

    if (section) {
      var name = toColumnName(i + 1);
      var title = columns[i];
      var validation = validations[i];
      var type = validation && validation.getCriteriaType().toString();

      var field = {
        name: name,
        title: title,
        type: type,
      };

      if (validation) {
        field.values = validation.getCriteriaValues();

        if (type === SpreadsheetApp.DataValidationCriteria.VALUE_IN_LIST) {
          field.choices = validation.getCriteriaValues()[0];
        } else if (type === SpreadsheetApp.DataValidationCriteria.CHECKBOX) {
          field.choices = validation.getCriteriaValues();
        }
      }

      section.fields.push(field);
    }
  }

  // Add the final section
  if (section && section.fields) {
    fields.push(JSON.parse(JSON.stringify(section)));
  }

  return fields;
}
