Known Issues {#known_issues}
=========================================

# Electrical

Rev v1.0.0 PCB uses ESP32 GPIO2 for HID Reader 'Green LED'.
This prevents the device from being programmed in-socket.
Disconnecting the 'Green LED' (orange wire) allows the device to be programmed
in-socket, with the temporary loss of control over the green LED.

# Firmware

A modified mbedTLS version must be used to support multiple HTTPS connections.
This variant is included here as a submodule in firmware/components/mbedtls/
Available from: https://github.com/lws-team/mbedtls.git on the esp32 branch.

# Web Components

Hardcoded values in query in webcomponents/view-user-page.html
