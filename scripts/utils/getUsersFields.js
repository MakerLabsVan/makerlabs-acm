/// @addtogroup scripts
/// @{
/// @file
/// @brief Use `NamedRange`s on the "Users" sheet to determine the section title
/// and column title for each column/field and include its associated metadata.

/// @brief Use `NamedRange`s on the "Users" sheet to determine the section title
/// and column title for each column/field and include its associated metadata.
///
/// Use the following `NamedRange`s on the "Users" sheet ({"users_section_headers", "users_column_headers", "users_template_row"})
///
/// @return Object representing each section of columns/fields, with each
/// column/field including its column letter, field type and validation choices.
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

        if (type === "VALUE_IN_LIST") {
          field.choices = validation.getCriteriaValues()[0];
        } else if (type === "CHECKBOX") {
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
/// @}
