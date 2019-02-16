#!/bin/bash

set -euo pipefail
IFS=$'\n\t'

IDF_PATH="$(pwd)/esp-idf"

# Extract MACHINE_NAME as first arg, then remove it
MACHINE_NAME="${1:-default}"
shift

BUILD_DIR="$(pwd)/build-${MACHINE_NAME}"

$IDF_PATH/tools/idf.py \
  --no-warnings \
  -G Ninja \
  -DSDKCONFIG="${BUILD_DIR}/sdkconfig" \
  -B "${BUILD_DIR}" \
  $@
