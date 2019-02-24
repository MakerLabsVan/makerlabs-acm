firmware/
=========================================

# Overview
The ESP32 [Espressif IoT Development Framework / `esp-idf`](https://github.com/espressif/esp-idf)
(based on FreeRTOS) is used for the Reader unit firmware. The Reader unit
connects to the MakerLabs wi-fi network(s), and sends RFID tag IDs events to an
HTTPS endpoint (currently in AWS), which returns the matching MakerLabs maker
details for that tag (if any), including their permissions for the specific
Reader unit making the request.

The format of data exchanged via the HTTPS request / response (as well as for
messages within the firmware) uses [flatbuffers](https://google.github.io/flatbuffers/)
encoding. New message types are introduced in `*.fbs` files, used throughout the
repo. Specific "canned" flatbuffer messages are generated from JSON templates
(at build-time) and flashed to the device filesystem during programming. These
flatbuffer files contain the details of the HTTPS requests to be sent.

The Reader authenticates itself via an OAuth access token which is refreshed
every 20 minutes (the token is only valid for 1 hour maximum) from a hard-coded
OAuth refresh token.

An additional background process checks for periodic over-the-air (OTA) firmware
updates from hard-coded Google Drive folder every minute.

# Design
## `esp32-network-lib` Support Library
### actor_model


## Pinned `esp-idf` version, component versions
A [custom mbedtls component (@paulreimer/mbedtls#new-esp-idf)](https://github.com/paulreimer/mbedtls/tree/new-esp-idf)
is used based on a fork that uses dynamic memory allocation for the TLS
contexts. This allows multiple concurrent TLS sessions on the ESP32, which would
otherwise trigger an out-of-memory condition.

The following versions are the last-known good ones:
- `esp-idf` @ [abea9e4](https://github.com/espressif/esp-idf/tree/abea9e4c02bb17e86298aec4e299780399e4789f)
- `components/mbedtls` @ [7655738](https://github.com/paulreimer/mbedtls/tree/7655738a3c2b3e5a02b5a93db2f83b3d6042e045)

@note Where possible, `esp-idf`'s `CMake` integration (using `CMakeLists.txt`)
should be used. `Makefile`s (using `component.mk`) are still supported but
otherwise deprecated.

## Custom `esp-idf` Components
### `u8g2` OLED Screen Library
The [u8g2](https://github.com/olikraus/u8g2) library is used to display text on
the OLED display screen. The custom interface between the library and the ESP32
I2C driver is implemented in the `u8g2_esp32_hal.cpp` file.

@note The @ref `display_behaviour` actor process operates the display using this
component with its own runloop, accepting messages from the `display.fbs`
flatbuffer schema definition file.

### `wiegand_reader` HID Global iClass RFID Reader
A custom component for extracting the RFID tag bits from an HID Global iClass
series reader. These readers use the 2-wire Wiegand protocol, which is mapped
to two ESP32 GPIOs.

The `wiegand_reader` component is split into three classes:
- A `WiegandReader` base class, implementing the GPIOs and 26-bit tag read
functionality.
- An `HIDGlobalReader` class extending `WiegandReader` to support a tag scanning
state-machine which uses the HOLD pin to re-trigger a periodic tag read. Also
supports toggling the beeper and green/red LEDs through additional GPIO pins.
- An `HIDGlobalTagID` helper class which validates the 26-bit tag read data
(via parity check), and extracts the `facility_code` and `card_number`.

@note the @ref rfid_reader_actor process responds to periodic `scan` messages,
and uses this component to toggle the hold line to see if a tag is still
present, and report the tag ID when it is first seen/lost.

# Configuration
## Generate a Google OAuth Refresh Token

## Configure Wi-Fi network details

## Configure ACM Reader-specific settings

# Deployment
## Generate a Google OAuth Refresh Token

# API Reference
[firmware/ API Documentation](@ref firmware)

@{
@defgroup firmware firmware/
See @ref md__docs_firmware "firmware/ Documentation"
@}
