function doGet(e) {
  const route = e.parameter.href || "users-fields";

  switch (route) {
    default:
    case "users-fields":
      return viewUsersFields(e);
      break;
  }
}
