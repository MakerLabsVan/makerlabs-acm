/**
@addtogroup scripts
@{

@file
@brief Documentation metadata for config files in this directory

@file scripts/package.json
@brief Runnable targets: `apps-login`, `logout`, `pull`, `push`, `deploy`. Only
dependency is `@google/clasp` for the `clasp` command.

@file appsscript.json
@brief Default Google Apps Script project settings such as language and website
deploy options.

@file .clasp.json
@brief Contains Google Apps Script project id, should be changed when changing
target spreadsheet.

@file .claspignore
@brief List of files that should not be syncedto Google Apps Script with `clasp`
(e.g. `package.json`).

@dir macros
@brief Functions which can be used inside Google Spreadsheet cells.

@dir triggers
@brief Functions which are intended to be used as Google Apps Script triggers.

@dir utils
@brief Utilities and helpers using the Google Apps Script Spreadsheet APIs
(e.g. `Sheet`, `Range`, `NamedRange`).

@dir views
@brief Contains entrypoint for Google Apps Script website deploy, and multiple
functions returning JSON content which can be selected by using the `?href=`
parameter in HTTPS requests.

@dir templates
@brief HTML templates used for sending branded e-mails.

@file templates/activity-usage-email.html
@brief E-mail template to render `activitySummary` for possibly multiple
MakerLabs IDs, showing details, summary and usage totals.

The same template is used for the usage e-mails (single MakerLabs ID), as well
as for the billing e-mails (in that case it contains activity data from multiple
MakerLabs IDs, each separated by MUI Material Design panels.

@file templates/branded-email.html
@brief E-mail template content wrapper/theme, using
[MUI (Material Design CSS Framework)](https://www.muicss.com/) panels.

Template is provided `hasLogo`, `emailBodyTitle`, `emailContent`, and
`emailFooter`, all of which are optional and will skip any empty sections.
The logo is embedded as base64 in the e-mail HTML directly, as well as the
full MUI CSS framework.

@file templates/thank-you-footer.html
@brief E-mail template footer containing MakerLabs contact info & hours.

@}
*/
