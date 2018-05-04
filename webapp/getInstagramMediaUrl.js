// Replace any instagram.com URL with something like the following:
// https://www.instagram.com/p/<shortcode>/media/?size=m
function getInstagramMediaUrl(originalPhotoUrl) {
  var photoUrl = originalPhotoUrl

  var instaUrl = 'instagram.com/p/'
  var shortcodeStartsAt = originalPhotoUrl.indexOf(instaUrl)

  if (shortcodeStartsAt != -1) {
    var slash = '/'
    var nextSlash = originalPhotoUrl.indexOf(
      slash,
      shortcodeStartsAt + instaUrl.length
    )
    if (nextSlash == -1) {
      nextSlash = originalPhotoUrl.length - slash.length
    }

    photoUrl =
      originalPhotoUrl.substr(0, nextSlash + slash.length) + 'media/?size=m'
  }

  return photoUrl
}
