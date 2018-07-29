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
