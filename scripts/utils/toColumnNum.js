/// @addtogroup scripts
/// @{
/// @file
/// @brief Get column number from column letter

/// @brief Get column number from column letter
///
/// @param colName Column letter
///
/// @return Column index, 0-based
function toColumnNum(name) {
  /// http://cwestblog.com/2013/09/05/javascript-snippet-convert-number-to-column-name/
  var colNum = 0;
  for (var i = 0; i < name.length; ++i) {
    colNum += (parseInt(name[i], 36) - 9) * Math.pow(26, name.length - i - 1);
  }
  return colNum;
}
/// @}
