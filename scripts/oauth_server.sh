#!/bin/bash

set -e

read -p 'OAuth Client ID: ' OAUTH_CLIENT_ID
read -p 'OAuth Client Secret: ' OAUTH_CLIENT_SECRET

OAUTH_SCOPES="https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive.readonly"

open "https://accounts.google.com/o/oauth2/auth?client_id=${OAUTH_CLIENT_ID}&scope=${OAUTH_SCOPES}&access_type=offline&prompt=consent&response_type=code&redirect_uri=http://127.0.0.1:2015/oauth2/token" \
  && caddy -quiet " \
    log / stdout \"Copy the following string, and run it in a separate terminal window: \
curl \
--silent \\\"https://www.googleapis.com/oauth2/v4/token\\\" \
-H \\\"Content-Type: application/x-www-form-urlencoded\\\" \
-X POST \
-d \\\"grant_type=authorization_code&client_id=${OAUTH_CLIENT_ID}&client_secret=${OAUTH_CLIENT_SECRET}&redirect_uri=http://127.0.0.1:2015/oauth2/token&code={?code}\\\" \
| jq -r .refresh_token\""
