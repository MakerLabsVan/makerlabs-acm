webcomponents/
=========================================

# Overview
## /view-user-page.html
### App Startup, Initial CM Login, Fetch Form/Search Data

@htmlonly
<div class="mermaid">
  sequenceDiagram
    participant CM User
    participant Web Frontend
    participant Google Auth
    participant Firebase
    participant Google Proxy
    participant Users Sheet
    participant Activity Sheet

    Web Frontend->>Web Frontend: (On Login, Load Latest Form Columns)
    Web Frontend->>Web Frontend: (On Edited User, Update Search List)
    Web Frontend->>Web Frontend: (On Search, Fetch Latest Data)
    CM User->>Web Frontend: Click Login Button
    Web Frontend->>Google Auth: Open Google Login Popup
    Google Auth->>Web Frontend: OAuth Refresh Token

    loop 20 minutes
      Web Frontend->>Google Auth: Send Refresh Token
      Google Auth->>Web Frontend: ID Token (valid 1 hour)
    end

    Web Frontend->>Google Proxy: Request Users Spreadsheet Columns / Fields
    Google Proxy->>Users Sheet: (Proxied Query)
    Users Sheet->>Google Proxy: Form Fields
    Google Proxy->>Web Frontend: Form Fields
    Web Frontend->>Google Proxy: Query For All Machine IDs
    Google Proxy->>Activity Sheet: (Proxied Query)
    Activity Sheet->>Google Proxy: Machine IDs
    Google Proxy->>Web Frontend: Machine IDs
    Web Frontend->>Google Proxy: Query All Users, (Searchable Fields Only)
    Google Proxy->>Users Sheet: (Proxied Query)
    Users Sheet->>Google Proxy: Users
    Google Proxy->>Web Frontend: Users

    loop 10 seconds
      Web Frontend->>Google Proxy: Request Latest Front Desk Activity (Unassigned / No MakerLabs ID)
      Google Proxy->>Activity Sheet: (Proxied Query)
      Activity Sheet->>Google Proxy: Latest Tag IDs Within 2 Minutes
      Google Proxy->>Web Frontend: Latest Tag IDs Within 2 Minutes
    end
</div>
@endhtmlonly

# Design
A single HTML page (`view-user-page.html`) provides the entrypoint for the main
[ACM search/view/edit Maker page](https://makerlabs-acm.firebaseapp.com/view-user-page.html).

## WebComponents
The page is composed of [WebComponents](https://www.webcomponents.org/introduction)
using Javascript classes which inherit from [LitElement](https://github.com/Polymer/lit-element).
This allows registering and creating custom HTML elements (e.g. `<my-element>`)
without needing a web framework (although the Polymer framework build tool is
used here to minify all JS into a single bundle for uploading to Firebase
Hosting).

### Custom WebComponents
The following WebComponents classes / elements are defined:
- [AppShell / <app-shell>](@ref AppShell)
- [GoogleSigninButton / <google-signin-button>](@ref GoogleSigninButton)
- [UserSearchBar / <user-search-bar>](@ref UserSearchBar)
- [ViewUserForm / <view-user-form>](@ref ViewUserForm)
- [ImageFileUploader / <image-file-uploader>](@ref ImageFileUploader)

And highlighted on the following diagram:
![Color-highlighted HTML elements used on /view-user-page](view-user-page_annotated.png "HTML Elements used on /view-user-page")

## Dynamic Maker Form / Fields
The form displayed on `view-user-page.html` -- using the `<view-user-form>`
WebComponent -- is based on the current columns in the "Users" sheet of the ACM
spreadsheet. This data is loaded dynamically when the page is loaded and a valid
user is signed-in. Each section title in the first row of the sheet creates a
separate Material Design "panel" in the form. Each column within that section
will render as a suitable form control, based on the type of
formatting/validation applied to the spreadsheet column. This latest set of
form fields is fetched via a request to the `?href=users-fields` handler in
Google Apps Script, which runs the `viewUsersFields` view to create a JSON blob
describing the fields.

@note Accessing Google Apps Script endpoints requires a valid Google Auth, so no
fields can be displayed if the user is not logged in. After logging in, and/or
when refreshing the page, the latest set of fields should be rendered (e.g.
after adding, removing, renaming or reordering columns).

## Maker Search Bar
The search bar is populated from via a Google Visualization API query which
extracts all data rows from the "Users" sheet when the page is loaded.

Whenever a new Maker is added or edited through the form, the corresponding user
details should be changed in the search bar after saving has completed.

@note Updates to the "Users" sheet directly through Google Sheets, and/or from
other users making changes through the form, will not be updated automatically.
A page refresh (via e.g. Cmd-Shift-R) is required to fully sync the search bar.

## Automatic "Next MakerLabs ID"
Clicking the "+" floating-action-button at the bottom-right of the screen
will clear the form fields, and triggers populating the `MakerLabs ID` column
with the next available `MakerLabs ID` based on a request to the
`?href=next-makerlabs-id` handler in Google Apps Script.

# Configuration
## Google Spreadsheet, Google Drive, Google Login details
Common customizations such as changing the Spreadsheet ID, or Google Drive
profile photo folder ID, requires changing the properties on the `<app-shell>`,
set at the bottom of `view-user-page.html`.

### Firebase Hosting URL, Deployed Files, Function Mappings
The Firebase Hosting rules and URL paths are configured at the top-level of this
repository in the [`firebase.json` file](https://firebase.google.com/docs/hosting/full-config).

### Firebase Project Details
The Firebase projects (and environments used by the `deploy -P <env>` command)
are configure at the top-level of this repository in the [`.firebaserc` file](https://firebase.google.com/docs/cli/#managing_project_aliases)

### Hard-coded Spreadsheet Details
It is possible to modify the hard-coded strings which the Google Spreadsheet
uses and should be expected to match those in
[<view-user-form>](@ref ViewUserForm).
These include constants such as Sheet names ("Users" / "Activity"), as well as
which columns are fetched for search, and which section title (Row 1 text) is
used for critical fields such as "MakerLabs ID".

# Deployment
## Build
The [Polymer build system](https://github.com/Polymer/tools/tree/master/packages/cli)
is used to package all Javascript and assets into a single minified bundle. As
well it can be used to run a local development server which uses the
WebComponent JS files directly and serves them as they are edited.

The [`polymer.json` file](https://polymer-library.polymer-project.org/3.0/docs/tools/polymer-json)
is used by the `polymer` command to configure the build.

The build process can be invoked via:
```
yarn build
```

## Deploy
Running the Polymer build process packages the HTML, JS, and Service Worker
configuration files into the `build` directory. The `build/es6-bundled`
directory is uploaded to Firebase Hosting as the root of the site.

The deployment process can be invoked (it will rebuild first) via:
```
# Deploy to the test environment (https://makerlabs-acm-test.firebaseapp.com)
yarn deploy -P dev

# Deploy to the production environment (https://makerlabs-acm.firebaseapp.com)
# yarn deploy -P production
```

# API Reference
[webcomponents/ API Documentation](@ref webcomponents)

@{
@defgroup webcomponents webcomponents/
See @ref md__docs_webcomponents "webcomponents/ Documentation"
@note Click on the classes below for more info about their private functions.
@}
