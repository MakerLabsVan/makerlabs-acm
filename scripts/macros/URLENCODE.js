/// @addtogroup scripts
/// @{
/// @file
/// @brief Convert a string to a URL-encoded version safe to use in URLs.

/// @brief Convert a string to a URL-encoded version safe to use in URLs.
///
/// E.g. convert spaces to `%20`
///
/// @param value Possibly un-safe string
///
/// @return URL-encoded version of the input string
function URLENCODE(value) {
  return Array.isArray(value)
    ? value.map(function(e) {
        return e.map(function(cellValue) {
          return encodeURIComponent(cellValue);
        });
      })
    : encodeURIComponent(value);
}
/// @}
