# Google Sheets, Drive, Cloud Integration Setup Steps
- [ ] Be logged in with the target Google Apps user, and logged out of all other users.  
      A Chrome incognito window works best.

### Google APIs Enable Steps
- [ ] Enable Google Apps Script API for Google Cloud Platform project:
    > https://console.developers.google.com/flows/enableapi?apiid=script

- [ ] Enable Google Drive API for Google Cloud Platform project:
    > https://console.developers.google.com/flows/enableapi?apiid=drive

- [ ] Enable the Google Apps Script API for your personal Google Apps user:
    > https://script.google.com/home/usersettings

### Google OAuth Client Creation Steps
- [ ] Create a Google Cloud OAuth client:
    > https://console.developers.google.com/apis/credentials

  Use the `Create credentials -> OAuth client ID` button to create a new 'OAuth client ID' with the following settings:
    - Application Type: `Web Application`
    - Name: `MakerLabs ACM Offline Access Requests`
    - Authorized JavaScript origins:
        -  `http://127.0.0.1`
    - Authorised redirect URIs:
        - `http://127.0.0.1/oauth2/code`
        - `http://127.0.0.1/oauth2/token`

### Google Drive OTA Firmware Folder Creation Steps
- [ ] Create or re-use a Google Drive folder within the organization's Drive to hold the firmware files  
    (e.g A new folder named "MakerLabs ACM Firmware")
- [ ] Upload two (empty) files from within the `firmware/build/` directory to the Drive folder used above:
    - `firmware/build/latest.fw.fb`
    - `firmware/build/makerlabs-acm-reader-lock.bin`

### Google Apps Script Steps
- [ ] Create a Google Apps Script project
    > From inside the Google Drive Spreadsheet, under `Tools -> Script Editor`
    - Select and existing project, or create a new one
    - Ensure the Google Apps Script project has a title set, and has been saved

# Configuration Steps
- [ ] Obtain the following pieces of information:
    - From the MakerLabs wifi network:
        - `Wifi SSID` (2.4GHz-only)
        - `Wifi Password`

    - From the GitHub repo:
        - `GitHub organization/user name`
        - `GitHub repo name`
        - `GitHub repo branch`

    - From the OAuth client ID credentials:
      > https://console.developers.google.com/apis/credentials
        - `Client ID`
        - `Client secret`

    - From the Google Drive Spreadsheet:
        - `Spreadsheet ID`
        - `Permissions column name`

    - From the Google Apps Script project:
        - `Script ID` (from `File -> Project Properties -> Script ID`)

    - From the Google Drive firmware folder:
        - Drive `id` of `latest.fw.fb` file (In Google Drive, right-click the file -> `Get Sharable Link`. copy the portion *after* "https://drive.google.com/open?id=")
        - Drive `id` of `makerlabs-acm-reader-lock.bin` file

- [ ] Update the Wifi info where it is used:
    - `yarn firmware menuconfig`
        - `MakerLabs ACM Configuration -> Wifi SSID`
        - `MakerLabs ACM Configuration -> Wifi Password`

- [ ] Update the Google Sheets info where it is used:
    - `yarn firmware menuconfig`
        - `MakerLabs ACM Configuration -> Permission Column Label`
        - `MakerLabs ACM Configuration -> Google Apps Spreadsheet ID`

- [ ] Update the Google Drive OTA firmware info where it is used:
    - `yarn firmware menuconfig`
        - `Firmware Update / OTA Configuration -> Firmware Update Latest Version URL`  
          The full HTTPS download URL to the Google Drive file `id` for `latest.fw.fb`
          found as: `https://www.googleapis.com/drive/v3/files/<id>?alt=media`
        - `Firmware Update / OTA Configuration -> Firmware Update Check URL`  
          The full HTTPS download URL to the Google Drive file `id` for `makerlabs-acm-reader-lock.bin`
          found as: `https://www.googleapis.com/drive/v3/files/<id>?alt=media`

- [ ] Update the Google Sheets info where it is used:
    - `yarn firmware menuconfig`
        - `MakerLabs ACM Configuration -> Permission Column Label`
        - `MakerLabs ACM Configuration -> OAuth Client Secret`
        - `MakerLabs ACM Configuration -> OAuth Refresh Token`

- [ ] Update the GitHub repo info where it is used:
    - `webapp/views/AppLayoutTemplate.html`  
      ```
      <base href="https://cdn.rawgit.com/<GITHUB_ORG>/<REPO_NAME>/<BRANCH_NAME>/webcomponents/bower_components/">
      ```
    - `git add webapp/views/AppLayoutTemplate.html && git commit`
