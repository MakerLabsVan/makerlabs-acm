const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");

const ACM_CONFIG_FILE = process.env.ACM_CONFIG_FILE || "config.test.yml";
const config = yaml.safeLoad(
  fs.readFileSync(path.join(path.dirname(__dirname), ACM_CONFIG_FILE), "utf8")
);

module.exports = {
  from: [/"scriptId":\s*"[^"]*"/, /"projectId":\s*"[^"]*"/],
  to: [
    `"scriptId":"${config.GOOGLE_APPS_SCRIPT_ID}"`,
    `"projectId":"${config.GCLOUD_PROJECT}"`
  ],
  files: ".clasp.json"
};
