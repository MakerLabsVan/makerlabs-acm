// http://cwestblog.com/2013/09/05/javascript-snippet-convert-number-to-column-name/
function toColumnName(num) {
  var ret = "";
  for (var a = 1, b = 26; (num -= a) >= 0; a = b, b *= 26) {
    ret = String.fromCharCode(parseInt((num % b) / a, 10) + 65) + ret;
  }
  return ret;
}
