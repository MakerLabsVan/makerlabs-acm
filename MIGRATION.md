# When the Google Apps domain changes:
- Enable the Google Apps Script API:
  (guide) https://developers.google.com/apps-script/api/how-tos/enable#using_the_apps_script_api_in_your_app
  (direct link) https://console.developers.google.com/flows/enableapi?apiid=script


# When the GitHub repo name changes:
- The following line in `webapp/views/AppLayoutTemplate.html` should be changed
  to reflect the new GitHub org., repo name, and branch:
  ```
  <base href="https://cdn.rawgit.com/<GITHUB_ORG>/<REPO_NAME>/<BRANCH_NAME>/webcomponents/bower_components/">
  ```

# When the Wifi SSID/password changes:
- Modify the settings in the firmware configuration menu under the heading
  'Makerlabs ACM Configuration':
  ```
  yarn firmware menuconfig
  ```

# When the Google Drive Spreadsheet ID changes:
- Modify the settings in the firmware configuration menu under the heading
  'Makerlabs ACM Configuration':
  ```
  yarn firmware menuconfig
  ```

- Update the Google Apps Script ID in `webapp/.clasp.json`:
  Obtain the Google Apps Script ID from within Google Apps Script Editor UI
  via `File -> Project properties -> Script ID`

  Enter this Script ID in `webapp/.clasp.json`

- TODO: Update the spreadsheet id in webapp/...

# When the Google Drive Spreadsheet Sheet names change (Users, Activity, Logs):
- Update the URLs in `firmware/main/templates/*.json.tpl`

- TODO: Update the names in webapp/...

# When the Google Drive Spreadsheet 'Users' sheet columns change:

# When the Google Drive OAuth "client_id" or "client_secret" expires or changes:

# When the Google Drive OAuth "refresh_token" expires or changes:

