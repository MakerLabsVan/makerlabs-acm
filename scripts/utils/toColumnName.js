/// @addtogroup scripts
/// @{
/// @file
/// @brief Get column letter from column index

/// @brief Get column letter from column index
///
/// @param colNum Column index, 0-based
///
/// @return Column letter
function toColumnName(num) {
  /// http://cwestblog.com/2013/09/05/javascript-snippet-convert-number-to-column-name/
  var ret = "";
  for (var a = 1, b = 26; (num -= a) >= 0; a = b, b *= 26) {
    ret = String.fromCharCode(parseInt((num % b) / a, 10) + 65) + ret;
  }
  return ret;
}
/// @}
