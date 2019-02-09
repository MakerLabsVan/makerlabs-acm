functions/
=========================================

# Design
## Overview
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

There are two Serverless function handlers used by ACM:
- [/permissions_check](@ref permissions_check_http), which receives an `ACM.Activity` binary flatbuffer,
determines which MakerLabs ID it belongs to, and returns details for the
matching user (including current permissions list) as an `ACM.User` flatbuffer.
@note Located in AWS Lambda, as this made a significant latency improvement
resulting in faster scan times. The performance benefit was large enough
that this handler was moved to AWS `us-west-2`. As a result, Firebase
credentials must be provided to the handler including which Google Cloud project
to use, and a private key for a locked-down Firebase service account which can
only access the Firebase Database for that project.

- [/google_apps_script_proxy](@ref google_apps_script_proxy_http), which forwards any requests to Google Apps Script
and proxies the response so Google Spreadsheets data by be loaded by the
website (outside of Google Apps Script hosting limits).
@note This is a Firebase Function deployed to the same project as the website
(Firebase Hosting). It is also mapped via URL rewrite to
`/google_apps_script_proxy` on the same domain as the website, so it may be
accessed without configuring cross-domain CORS access.

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

## Deploy
The deployment process can be invoked (it will rebuild first) via:
```
# Deploy to the test environment
yarn deploy
# Deploy to the production environment
# yarn build
# firebase deploy --only functions -P production
# sls deploy --stage production
```

# API Reference
[functions/ API Documentation](@ref functions)

@{
@defgroup functions functions/
See @ref md_docs_functions "functions/ Documentation"
@}
