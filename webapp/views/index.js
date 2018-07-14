function doGet(e) {
  var route = e.parameter.href || 'view-user-fields'

  switch (route) {
    default:
    case 'view-user-fields':
      return viewUserFields(e)
      break;
  }
}
