function doGet(e) {
  var route = e.parameter.href || 'users-fields'

  switch (route) {
    default:
    case 'users-fields':
      return viewUsersFields(e)
      break;
  }
}
