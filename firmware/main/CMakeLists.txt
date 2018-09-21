set(
  COMPONENT_REQUIRES
    actor_model
    fatfs
    firmware_update
    module_manager
    network_manager
    nvs_flash
    requests
    utils
    u8g2
    wiegand_reader
)

set(COMPONENT_ADD_INCLUDEDIRS . src/gen)

set(
  COMPONENT_SRCS
    "acm_helpers.cpp"
    "app_actor.cpp"
    "auth_actor.cpp"
    "display_actor.cpp"
    "machine_actor.cpp"
    "main.cpp"
    "rfid_reader_actor.cpp"
    "start_app.cpp"
)

register_component()

set_property(
  SOURCE acm_helpers.cpp
  APPEND PROPERTY
  COMPILE_DEFINITIONS _GLIBCXX_USE_C99=1
)

set_property(
  SOURCE start_app.cpp
  APPEND PROPERTY
  COMPILE_DEFINITIONS _GLIBCXX_USE_C99=1
)

set_property(
  SOURCE rfid_reader_actor.cpp
  APPEND PROPERTY
  COMPILE_DEFINITIONS _GLIBCXX_USE_C99=1
)

FLATBUFFERS_GENERATE_GENERATED_H(acm_generated_h acm.fbs)
FLATBUFFERS_GENERATE_GENERATED_H(display_generated_h display.fbs)

set_property(
  SOURCE acm_helpers.cpp start_app.cpp
  APPEND PROPERTY
  OBJECT_DEPENDS "${acm_generated_h_TARGET}"
)
add_dependencies(${COMPONENT_NAME} acm_generated_h_TARGET)

set_property(
  SOURCE acm_helpers.cpp start_app.cpp display_actor.cpp
  APPEND PROPERTY
  OBJECT_DEPENDS "${display_generated_h_TARGET}"
)
add_dependencies(${COMPONENT_NAME} display_generated_h_TARGET)

foreach(
  cacert
  WILDCARD_googleapis_com_root_cacert
  WILDCARD_execute_api_us_west_2_amazonaws_com_root_cacert
)
  REQUESTS_EMBED_CERTIFICATE_DER(${cacert})
  add_dependencies(${COMPONENT_NAME} ${cacert}_TARGET)
endforeach()

set_property(
  SOURCE app_actor.cpp
  APPEND PROPERTY
  OBJECT_DEPENDS
    "${WILDCARD_googleapis_com_root_cacert_TARGET}"
    "${WILDCARD_execute_api_us_west_2_amazonaws_com_root_cacert_TARGET}"
)

add_custom_command(
  OUTPUT "secrets/gen/auth_request_intent.req.json"
  COMMAND
    sed
    -e "s#@CONFIG_ACM_OAUTH_TOKEN_URL@#${CONFIG_ACM_OAUTH_TOKEN_URL}#"
    "templates/auth_request_intent.req.json.tpl"
    > "secrets/gen/auth_request_intent.req.json"
  DEPENDS "templates/auth_request_intent.req.json.tpl"
  WORKING_DIRECTORY "${COMPONENT_PATH}"
  VERBATIM
)

add_custom_command(
  OUTPUT "secrets/gen/firmware_update_check_request_intent.req.json"
  COMMAND
    sed
    -e "s#@CONFIG_FIRMWARE_UPDATE_CHECK_URL@#${CONFIG_FIRMWARE_UPDATE_CHECK_URL}#"
    "templates/firmware_update_check_request_intent.req.json.tpl"
    > "secrets/gen/firmware_update_check_request_intent.req.json"
  DEPENDS "templates/firmware_update_check_request_intent.req.json.tpl"
  WORKING_DIRECTORY "${COMPONENT_PATH}"
  VERBATIM
)

add_custom_command(
  OUTPUT "secrets/gen/permissions_check_request_intent.req.json"
  COMMAND
    sed
    -e "s#@CONFIG_ACM_PERMISSIONS_CHECK_URL@#${CONFIG_ACM_PERMISSIONS_CHECK_URL}#"
    "templates/permissions_check_request_intent.req.json.tpl"
    > "secrets/gen/permissions_check_request_intent.req.json"
  DEPENDS "templates/permissions_check_request_intent.req.json.tpl"
  WORKING_DIRECTORY "${COMPONENT_PATH}"
  VERBATIM
)

set_property(
  DIRECTORY "${COMPONENT_PATH}"
  APPEND PROPERTY
  ADDITIONAL_MAKE_CLEAN_FILES
    "secrets/gen/auth_request_intent.req.json"
    "secrets/gen/firmware_update_check_request_intent.req.json"
    "secrets/gen/permissions_check_request_intent.req.json"
)

foreach(
  req_intent
  firmware_update_check_request_intent
  auth_request_intent
  permissions_check_request_intent
)
  # Add custom target to represent generated input file(s)
  add_custom_target(
    ${req_intent}_INPUTS_TARGET
    DEPENDS "secrets/gen/${req_intent}.req.json"
  )

  REQUESTS_EMBED_REQUEST_INTENT(${req_intent})
  # Add dependency for generated target on generated input file(s)
  add_dependencies(${req_intent}_TARGET ${req_intent}_INPUTS_TARGET)
  add_dependencies(${COMPONENT_NAME} ${req_intent}_TARGET)
endforeach()

set_property(
  SOURCE app_actor.cpp
  APPEND
  PROPERTY OBJECT_DEPENDS
    "${firmware_update_check_request_intent_TARGET}"
    "${auth_request_intent_TARGET}"
    "${permissions_check_request_intent_TARGET}"
)
