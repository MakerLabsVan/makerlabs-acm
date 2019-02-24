functions/
=========================================

# Overview
There are two Serverless function handlers used by the ACM:
- [/permissions_check](@ref permissions_check_http), used by the Readers,
which receives an `ACM`.`Activity` binary flatbuffer, determines which
`MakerLabs ID` it belongs to, and returns details for the matching user
(including current permissions list) as an `ACM`.`User` flatbuffer.
@note Located in AWS Lambda, as this made a significant latency improvement
resulting in faster scan times. The performance benefit was large enough
that this handler was moved to AWS `us-west-2`. As a result, Firebase
credentials must be provided to the handler including which Google Cloud project
to use, and a private key for a locked-down Firebase service account which can
only access the Firebase Database for that project.

- [/google_apps_script_proxy](@ref google_apps_script_proxy_http), used by the
website, which forwards any requests to Google Apps Script
and proxies the response so Google Spreadsheets data can be loaded by the
website (outside of Google Apps Script hosting limits).
@note This is a Firebase Function deployed to the same project as the website
(Firebase Hosting). It is also mapped via URL rewrite to
`/google_apps_script_proxy` on the same domain as the website, so it may be
accessed without configuring cross-domain CORS access.

# Design
The functions are written in [Dart 2.x](https://www.dartlang.org/), which is
converted to Javascript code and uploaded to a "serverless" environment.
 In this case, two such environments are used:
- [AWS Lambda](https://aws.amazon.com/lambda/) is used for performance critical
request/response to Reader unit tag scans
([/permissions_check](@ref permissions_check_http)).
- [Cloud Functions For Firebase](https://firebase.google.com/docs/functions/) is
used for simple request proxying from Firebase Hosting website to access Google
Apps Script data such as the form `fields` JSON
([/google_apps_script_proxy](@ref google_apps_script_proxy_http)).

## Form Fields/Columns Caching
@note The fields JSON used by the [/permissions_check](@ref permissions_check_http)
function is cached between invocations to improve performance (the fields are
rarely changing). Generally, AWS Lambda execution units get restarted every few
hours (or immediately after a re-deploy), so it may take some amount of time for
the [/permissions_check](@ref permissions_check_http) endpoint to sync with any
column changes.

## Uptime / Ping Check
@note To avoid "cold start" latency issues with serverless functions, a
healthcheck via Google Cloud Platform Stackdriver was created to ping the
endpoint every few minutes (via HTTPS GET, including the `?ping=1` query arg).

## Function Execution Logs
### /permissions_check (AWS Lambda)
These logs are available under AWS CloudWatch for the Lambda handler in the
appropriate environment (`dev` or `production`).

@note In AWS, a new log bucket is created every few hours -- each time the
Lambda execution unit is restarted.

### /google_apps_script_proxy (Firebase Functions)
These logs can be found from the Firebase Console under the Functions section.
Logs from multiple execution units are combined together. The same data can also
be viewed in Google Cloud Functions dashboard, including metadata regarding when
the execution units are restarted.

@note Advanced function settings such as runtime version (e.g Node 8.x) and
memory limits must be configured in Google Cloud Functions console, with the
target Firebase Project selected as the Google Platform project.

# Configuration
## Dependencies
The Dart dependencies used at runtime are configured in the
`pubspec.yaml` file.
The JS dependencies used by the build/deploy tooling are configured in the
`webcomponents/package.json` file.

## Google Spreadsheet, Google Cloud Project / Firebase details
Common customizations such as changing the Spreadsheet ID, Google Cloud/Firebase
project name, and Firebase Database credentials for use outside Google
(e.g. in AWS Lambda) are configured separately for `production` and `dev`/`test`
environments in the `config.production.yml` and `config.dev.yml` files,
respectively (and deploying with either the `--stage production` or
`--stage dev` (the default) deploy flag).

# Deployment
## Build
Dart code must first be converted to Javascript code through the `Dart2JS` tool.
The build process can be invoked via:
```
yarn build
```

The results are packaged into the `functions/build` directory.

## Deploy
The deployment process can be invoked (it will trigger a rebuild first) via:
```
# Deploy to the test environment
yarn deploy

# Deploy to the production environment
# yarn build
# firebase deploy --only functions -P production
# sls deploy --stage production
```

# Observability
## Viewing the AWS /permissions_check Logs
The logs for the [/permissions_check](@ref permissions_check_http) AWS Lambda
HTTPS handler can be accessed by the following steps:
  - Login to the AWS Management Console:
  > https://us-west-2.console.aws.amazon.com/

  - Search for and select the "Cloudwatch" service (or use the following link:)
  > https://us-west-2.console.aws.amazon.com/cloudwatch

  - Select "Logs" from the sidebar

  - Choose the appropriate "Log Group" (e.g. `/aws/lambda/makerlabs-acm-functions-production-permissions_check`)

  - Select the appropriate "Log Stream" for the UTC timerange of interest.
  (A new Log Stream is created each time the AWS Lambda service is reloaded
  automatically.)


# API Reference
[functions/ API Documentation](@ref functions)

@{
@defgroup functions functions/
See @ref md__docs_functions "functions/ Documentation"
@}
