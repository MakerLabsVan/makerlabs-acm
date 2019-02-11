set(COMPONENT_REQUIRES utils)

set(COMPONENT_ADD_INCLUDEDIRS src)

set(
  COMPONENT_SRCS
    "src/hid_global_reader.cpp"
    "src/hid_global_tag_id.cpp"
    "src/wiegand_reader.cpp"
)

register_component()

set_property(TARGET "${COMPONENT_TARGET}" PROPERTY CXX_STANDARD 14)
set_property(TARGET "${COMPONENT_TARGET}" PROPERTY CXX_STANDARD_REQUIRED ON)
