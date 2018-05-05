# Google Sheets, Drive, Cloud Integration Setup Steps
- [ ] Be logged in with the target Google Apps user, and logged out of all other users.
      A Chrome incognito window works best.

### Google APIs Enable Steps
- [ ] Enable Google Apps Script API for Google Cloud Platform project:
    > https://console.developers.google.com/flows/enableapi?apiid=script

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

### Google Apps Script Steps
- [ ] Create a Google Apps Script project from inside the Google Drive Spreadsheet
    > Under `Tools -> Script Editor`
    - Select and existing project, or create a new one
    - Ensure the Google Apps Script project has a title set and has been saved

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

- [ ] Update the Wifi info where it is used:
    - `yarn firmware menuconfig`
        - `MakerLabs ACM Configuration -> Wifi SSID`
        - `MakerLabs ACM Configuration -> Wifi password`

- [ ] Update the GitHub repo info where it is used:
    - `webapp/views/AppLayoutTemplate.html`
      ```
      <base href="https://cdn.rawgit.com/<GITHUB_ORG>/<REPO_NAME>/<BRANCH_NAME>/webcomponents/bower_components/">
      ```
    - `git add webapp/views/AppLayoutTemplate.html && git commit`
