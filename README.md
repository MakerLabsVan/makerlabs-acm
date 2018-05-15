# makerlabs-acm
MakerLabs Access Control Management (ACM) System

## How-to obtain this repo:
# Clone this repo recursively:
```
git clone --recursive https://github.com/MakerLabsVan/makerlabs-acm
cd makerlabs-acm
```

# Pre-requisites (macOS):

- Electrical:
  Install KiCad 5.0+:
  http://downloads.kicad-pcb.org/osx/nightly/

- Firmware/Software:
  Install homebrew macOS package manager:
  ```
  /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
  ```

  Install `yarn`:
  ```
  brew install yarn
  ```

  Install dependencies:
  ```
  yarn deps
  yarn install
  ```

# Electrical

- Open the KiCad project:
  ```
  open -a kicad electrical/makerlabs-acm-reader-lock_v1.0.0.pro
  ```

# Firmware

- Configure firmware settings (Wifi SSID/password, Google Spreadsheet ID, etc):
  ```
  yarn firmware menuconfig
  ```

- Build a firmware image, flash it to the connected board:
  ```
  yarn firmware flash
  ```

- Same as above, but also monitor the serial data and reboot after flashing:
  ```
  yarn firmware flash monitor
  ```

- Build binaries for OTA firmware updates, upload them to Google Drive:
  (*note: increment the number in the `firmware/VERSION` file to allow clients to download it*)
  ```
  yarn firmware all_binaries && \
    gdrive update <firmware_image_id> firmware/build/makerlabs-acm-reader-lock.bin && \
    gdrive update <firmware_update_id> firmware/build/latest.fw.fb
  ```

# WebComponents

- Add WebComponent dependencies in webcomponents, via `bower`:
  ```
  yarn webcomponents-add <component names>
  ```

- Fetch/update WebComponent versions from latest packages:
  ```
  yarn webcomponents
  ```

Commit and push the updated files in `webcomponents/` and `webcomponents/bower_components/`

# Google Apps Script Webapp / Frontend

- Login to the Google Apps Script / online UI:
  ```
  yarn login
  ```

  Enable the Google Apps Script API for your personal Google Apps user:
  https://script.google.com/home/usersettings

- Pull changes from Google Apps Script / online UI:
  ```
  yarn pull
  ```

- (Make desired changes to files in `webapp/`)

- Push changes to Google Apps Script
  ```
  yarn push
  ```

- Deploy the latest changes as a webapp:
  ```
  yarn deploy
  ```
