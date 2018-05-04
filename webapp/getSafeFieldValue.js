function getSafeFieldValue(unsafeFieldValue) {
  // Object type replacements/substitutions
  if (typeof unsafeFieldValue === 'object') {
    // Date type replacements/substitutions
    if (Object.prototype.toString.call(unsafeFieldValue) === '[object Date]') {
      var utcMicrosecondsSinceEpoch = unsafeFieldValue.getTime() * 1000
      return utcMicrosecondsSinceEpoch
    }
  }
  // String type replacements/substitutions
  else if (typeof unsafeFieldValue === 'string') {
    // Convert the checkbox emoji into a boolean
    var checkboxChoices = ['☐', '☑']
    if (unsafeFieldValue == checkboxChoices[0]) {
      return false
    } else if (unsafeFieldValue == checkboxChoices[1]) {
      return true
    }

    // Remove =IMAGE("URL") formula to extract only the URL part
    var imageFormulaPrefix = '=IMAGE("'
    var imageFormulaSuffix = '",2)'
    var imageFormulaStart = unsafeFieldValue.indexOf(imageFormulaPrefix)
    var imageFormulaEnd = unsafeFieldValue.indexOf(imageFormulaSuffix)

    if (imageFormulaStart == 0 && imageFormulaEnd != -1) {
      var imageUrl = unsafeFieldValue.substring(
        imageFormulaStart + imageFormulaPrefix.length,
        imageFormulaEnd
      )

      return imageUrl
    }
  }

  // No changes, just return the input
  return unsafeFieldValue
}
