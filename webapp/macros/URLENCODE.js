function URLENCODE(value) {
  return Array.isArray(value)
    ? value.map(function(e){return e.map(function(cellValue) {return encodeURIComponent(cellValue)})})
    : encodeURIComponent(value);
}