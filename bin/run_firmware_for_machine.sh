#!/bin/bash

set -euo pipefail
IFS=$'\n\t'

IDF_PATH="$(pwd)/esp-idf"

# Extract MACHINE_NAME as first arg, then remove it
MACHINE_NAME="${1:?Must specific build-<MACHINE_NAME> name}"
shift

BUILD_DIR="$(pwd)/build-${MACHINE_NAME}"

if [ $# -eq 0 ]; then
  # No args runs this sequence
  $0 ${MACHINE_NAME} erase_flash
  $0 ${MACHINE_NAME} flash
  $0 ${MACHINE_NAME} flash_fatfs
  $0 ${MACHINE_NAME} monitor
elif [ "$1" = "flash_fatfs" ]; then
  cd "${BUILD_DIR}"
  ninja flash_fatfs
  cd -
else
  # Run a specific idf.py command
  $IDF_PATH/tools/idf.py \
    --no-warnings \
    -G Ninja \
    -DSDKCONFIG="${BUILD_DIR}/sdkconfig" \
    -B "${BUILD_DIR}" \
    $@
fi
