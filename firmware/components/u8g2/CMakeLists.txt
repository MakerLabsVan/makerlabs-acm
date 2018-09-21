set(COMPONENT_REQUIRES)

set(COMPONENT_ADD_INCLUDEDIRS lib/u8g2/csrc src)

set(
  COMPONENT_SRCS
    "lib/u8g2/csrc/u8g2_bitmap.c"
    "lib/u8g2/csrc/u8g2_box.c"
    "lib/u8g2/csrc/u8g2_buffer.c"
    "lib/u8g2/csrc/u8g2_circle.c"
    "lib/u8g2/csrc/u8g2_cleardisplay.c"
    "lib/u8g2/csrc/u8g2_d_memory.c"
    "lib/u8g2/csrc/u8g2_d_setup.c"
    "lib/u8g2/csrc/u8g2_font.c"
    "lib/u8g2/csrc/u8g2_fonts.c"
    "lib/u8g2/csrc/u8g2_hvline.c"
    "lib/u8g2/csrc/u8g2_input_value.c"
    "lib/u8g2/csrc/u8g2_intersection.c"
    "lib/u8g2/csrc/u8g2_kerning.c"
    "lib/u8g2/csrc/u8g2_line.c"
    "lib/u8g2/csrc/u8g2_ll_hvline.c"
    "lib/u8g2/csrc/u8g2_message.c"
    "lib/u8g2/csrc/u8g2_polygon.c"
    "lib/u8g2/csrc/u8g2_selection_list.c"
    "lib/u8g2/csrc/u8g2_setup.c"
    "lib/u8g2/csrc/u8x8_8x8.c"
    "lib/u8g2/csrc/u8x8_byte.c"
    "lib/u8g2/csrc/u8x8_cad.c"
    "lib/u8g2/csrc/u8x8_debounce.c"
    "lib/u8g2/csrc/u8x8_display.c"
    "lib/u8g2/csrc/u8x8_fonts.c"
    "lib/u8g2/csrc/u8x8_gpio.c"
    "lib/u8g2/csrc/u8x8_input_value.c"
    "lib/u8g2/csrc/u8x8_message.c"
    "lib/u8g2/csrc/u8x8_selection_list.c"
    "lib/u8g2/csrc/u8x8_setup.c"
    "lib/u8g2/csrc/u8x8_string.c"
    "lib/u8g2/csrc/u8x8_u16toa.c"
    "lib/u8g2/csrc/u8x8_u8toa.c"
    "src/u8g2_esp32_hal.cpp"

    # ESP32 TTGO OLED + LoRa
    "lib/u8g2/csrc/u8x8_d_ssd1306_128x32.c"
)

register_component()

set_source_files_properties(
  lib/u8g2/csrc/u8x8_d_sbn1661.c
  PROPERTIES COMPILE_FLAGS
  -Wno-unused-function
)
