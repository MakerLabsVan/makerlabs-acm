function getSafeFieldName(unsafeFieldName) {
  return unsafeFieldName
    .replace(/[- \/]+/g, '_') // Replace known separators with '_'
    .replace(/^([^A-Za-z])/, '_$1') // Prefix with '_' if not starting with a letter
    .replace(/\W/g, '') // Remove all other non-alphanumeric
    .toLowerCase() // Lowercase only
}
