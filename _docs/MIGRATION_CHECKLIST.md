Migration/Configuration Changes Checklist {#migration_checklist}
=========================================

# Firebase / Google Cloud Project Setup Steps
@note Be logged in with the target Google Apps user which should own the Google Apps
/Firebase resources, and logged out of all other Google users. A Chrome
incognito window works well for this if the target Google user is not your
normal login account.

- Add a new Firebase project, use a convenient name
  (e.g. `makerlabs-acm-example`) and UNcheck all "Analytics" checkboxes:
  > https://console.firebase.google.com/
  - Under "Customise data sharing for your new project", do not check any
  checkboxes.

- Upgrade the Firebase project from the "Spark plan" to the "Blaze plan" (Pay
  as you go). This requires a credit card attached to the Google Cloud Project,
  but the free limits are generous and should never be exceeded.
  - Click the "Spark plan" button to the right of the project name on the main
  page.
  - This process will attach the Firebase project with a Google Cloud project.

- Navigate to "Project settings" by clicking the gear icon next
  to "Project Overview". Select the "Service Accounts" tab and click "Generate
  new private key" for `Firebase Admin SDK` usage.
  - Accept the security notice, and save the JSON file in a secure location.

- Navigate to "Users and permissions" settings by clicking the gear icon next
  to "Project Overview". Additional users can be added to the Firebase project
  here.

- From the "Users and permissions" page, click the "Advanced permissions
  settings" link at the bottom right. This will open the project in the Google
  Cloud Platform Console.

# AWS Project Setup Steps
@note Be logged in with the target Amazon user which should own the AWS
resources, and logged out of all other Amazon users. An incognito window works
well for this if the target Google user is not your normal login account.

- Create a new AWS Account:
  > https://portal.aws.amazon.com/billing/signup

## Google APIs Enable Steps
- Enable Google Apps Script API for Google Cloud Platform project:
  > https://console.developers.google.com/flows/enableapi?apiid=script

- Enable Google Drive API for Google Cloud Platform project:
  > https://console.developers.google.com/flows/enableapi?apiid=drive

- Enable the Google Apps Script API for your personal Google Apps user:
  > https://script.google.com/home/usersettings

## Google OAuth Client Creation Steps
- Create a Google Cloud OAuth client:
  > https://console.developers.google.com/apis/credentials

  Use the `Create credentials -> OAuth client ID` button to create a new 'OAuth
  client ID' with the following settings:
    - Application Type: `Web Application`
    - Name: `MakerLabs ACM Offline Access Requests`
    - Authorized JavaScript origins:
        -  `http://127.0.0.1`
    - Authorised redirect URIs:
        - `http://127.0.0.1/oauth2/code`
        - `http://127.0.0.1/oauth2/token`

# Developer / Workstation Setup Steps
@note Make sure you have followed the steps in the README.md, at the minimum
installing `brew`, `yarn`, and running `make deps`.

- Obtain a refresh token (for the user whose Google Drive credentials will be
  used by the firmware)
  - Run the local script:
    > `./bin/oauth_server.sh`
  - When prompted, provide the `OAuth Client ID` and `OAuth Client Secret` from
    the credentials created above.
  - A browser window will popup, and the correct Google user should be selected
    here, logging in/out as necessary.
  - Grant 'Sheets' / 'Drive' permission to the OAuth app when requested.
  - Ignore the `404 Not Found` message, and return to the terminal where the
    `oauth_server.sh` script is running.
  - Copy the selected line (must contain a valid `token=` near the end of the
    line) into a new terminal window, and run it.
    (_note: if multiple lines are printed, only the first line with a token
    should be used_)
  - The output from running the above command is the `OAuth Refresh Token`.

## Google Drive "Maker Profile Photos" Folder Creation Steps
- Create or re-use a Google Drive folder within the organization's Drive to hold
  the uploaded Maker Profile Photo files
  (e.g A new folder named "Maker Profile Photos")
  - Click the 'Sharing settings' link and make sure the permissions are set
    appropriately (e.g. Organization-only viewing)

## Google Apps Script Steps
- Create a Google Apps Script project
> From inside the Google Drive Spreadsheet, under `Tools -> Script Editor`
  - Select and existing project, or create a new one
  - Ensure the Google Apps Script project has a title set, and has been saved

# Configuration Steps
## Obtain the following pieces of information:
- From the MakerLabs wifi network:
  - `Wifi SSID` (2.4GHz-only)
  - `Wifi Password`

- From the OAuth client ID credentials:
> https://console.developers.google.com/apis/credentials
  - `Client ID`
  - `Client secret`

- From the Google Drive Spreadsheet:
  - `Spreadsheet ID`
  - `Permissions column name`

- From the Google Apps Script project:
  - `Script ID` (from `File -> Project Properties -> Script ID`)

- From the Google Drive "Profile Photos" folder:
  - Folder `id` of "Profile Photos" folder

## Configure the firmware with the information above:
> The following settings are modified in the text GUI available via running
> `yarn firmware menuconfig`
-  Update the Wifi info where it is used:
  - `MakerLabs ACM Configuration -> Wifi SSID`
  - `MakerLabs ACM Configuration -> Wifi Password`

- Update the Google Sheets info where it is used:
  - `MakerLabs ACM Configuration -> Permission Column Label`
  - `MakerLabs ACM Configuration -> Google Apps Spreadsheet ID`

- Update the Google OAuth client info where it is used:
  - `MakerLabs ACM Configuration -> OAuth Client ID`
  - `MakerLabs ACM Configuration -> OAuth Client Secret`
  - `MakerLabs ACM Configuration -> OAuth Refresh Token`
