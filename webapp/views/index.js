function doGet(e) {
  var route = e.parameter.href || 'view-user-page'

  switch (route) {
    default:
    case 'view-user-page':
      return viewUserPage(e)
      break;
    case 'view-user-fields':
      return viewUserFields(e)
      break;
  }
}
