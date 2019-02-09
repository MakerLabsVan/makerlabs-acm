/// @addtogroup scripts
/// @{
/// @file
/// @brief Replace any instagram.com URL with something like the following:
/// `https://www.instagram.com/p/<shortcode>/media/?size=m`

/// @brief Replace any instagram.com URL with something like the following:
/// `https://www.instagram.com/p/<shortcode>/media/?size=m`
///
/// @param originalPhotoUrl String of a regular URL (which may be a regular
/// Instagram URL)
///
/// @return Original URL, or direct Instagram image URL if a regular Instagram
/// URL was detected.
function getInstagramMediaUrl(originalPhotoUrl) {
  var photoUrl = originalPhotoUrl;

  const instaUrl = "instagram.com/p/";
  const shortcodeStartsAt = originalPhotoUrl.indexOf(instaUrl);

  if (shortcodeStartsAt !== -1) {
    const slash = "/";
    var nextSlash = originalPhotoUrl.indexOf(
      slash,
      shortcodeStartsAt + instaUrl.length
    );
    if (nextSlash === -1) {
      nextSlash = originalPhotoUrl.length - slash.length;
    }

    photoUrl =
      originalPhotoUrl.substr(0, nextSlash + slash.length) + "media/?size=m";
  }

  return photoUrl;
}
/// @}
