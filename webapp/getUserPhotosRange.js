function getUserPhotosRange() {
  var userPhotosRange = null

  var sheetName = 'Users'
  var namedRangeName = 'photo'

  var userPhotoColumnRange = getNamedRange(sheetName, namedRangeName)

  if (userPhotoColumnRange) {
    userPhotosRange = excludeHeadersFromRange(userPhotoColumnRange)
  } else {
    //TODO: popup? this is bad.
  }

  return userPhotosRange
}
