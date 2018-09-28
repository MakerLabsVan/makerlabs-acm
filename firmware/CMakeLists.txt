cmake_minimum_required(VERSION 3.5)

set(EXTRA_COMPONENT_DIRS esp32-network-lib)

include($ENV{IDF_PATH}/tools/cmake/project.cmake)

add_c_compile_options(
  -fpie
)

add_cxx_compile_options(
  -finline-small-functions
  -findirect-inlining
  -fpie

  -Wmissing-declarations
  -Wmissing-include-dirs
  -Wextra
  -Wall
  -Winvalid-pch
  -Wformat=2
  -Wmissing-format-attribute

  -Wodr

  -Wno-format-nonliteral

  -Wno-unused-variable
  -Wno-missing-field-initializers
)

project(makerlabs-acm-reader-lock)
