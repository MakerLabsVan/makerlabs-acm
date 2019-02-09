/// @addtogroup scripts
/// @{
/// @file
/// @brief Google Apps Script HTTP handler. Checks the `?href=` parameter and
/// returns the result from the selected view.

/// @brief Google Apps Script HTTP handler. Checks the `?href=` parameter and
/// returns the result from the selected view.
///
/// @param e Google Apps Script HTTP Request event object
///
/// @return TextOutput representing content to return as body of HTTP response
function doGet(e) {
  const route = e.parameter.href || "users-fields";

  switch (route) {
    case "users-fields":
      return viewUsersFields(e);

    case "next-makerlabs-id":
      return viewNextMakerLabsId(e);

    default:
      break;
  }
}
/// @}
