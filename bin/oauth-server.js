#!/usr/bin/env node

// Copyright 2017, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

"use strict";

const { OAuth2Client } = require("google-auth-library");
const http = require("http");
const url = require("url");
const opn = require("opn");
const destroyer = require("server-destroy");

const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");

const ACM_CONFIG_FILE = process.env.ACM_CONFIG_FILE || "config.test.yml";
const config = yaml.safeLoad(
  fs.readFileSync(path.join(path.dirname(__dirname), ACM_CONFIG_FILE), "utf8")
);

const OAUTH_TOKEN_ACCESS_TYPE = "offline";
const OAUTH_TOKEN_REDIRECT_URI = "http://127.0.0.1:3000/oauth2/token";
const OAUTH_TOKEN_PROMPT_TYPE = "consent";

async function main() {
  const oAuth2Client = new OAuth2Client(
    config.OAUTH_CLIENT_ID,
    config.OAUTH_CLIENT_SECRET,
    OAUTH_TOKEN_REDIRECT_URI
  );

  // Generate the url that will be used for the consent dialog.
  const authorizeUrl = oAuth2Client.generateAuthUrl({
    scope: config.OAUTH_SCOPES,
    access_type: OAUTH_TOKEN_ACCESS_TYPE,
    prompt: OAUTH_TOKEN_PROMPT_TYPE
  });

  const endpointUrl = new URL(OAUTH_TOKEN_REDIRECT_URI);

  // Open an http server to accept the oauth callback. In this simple example,
  // the only request to our webserver is to /oauth2/token?code=<code>
  const server = http
    .createServer(async (req, res) => {
      if (req.url.indexOf(endpointUrl.pathname) > -1) {
        // Acquire the code from the querystring, and close the web server.
        const qs = new url.URL(req.url, endpointUrl.origin).searchParams;
        const code = qs.get("code");
        res.end(
          "OAuth2 Refresh Token generated successfully. Return to the terminal."
        );
        server.destroy();

        // Now that we have the code, use that to acquire tokens.
        const r = await oAuth2Client.getToken(code);
        //console.log(r.tokens.refresh_token);
        console.log(r.tokens.refresh_token);
      }
    })
    .listen(endpointUrl.port, () => {
      // Open the browser to the authorize url to start the workflow
      opn(authorizeUrl, { wait: false }).then(cp => cp.unref());
    });
  destroyer(server);
}

main().catch(console.error);
