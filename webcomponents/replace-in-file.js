const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");

const ACM_CONFIG_FILE = process.env.ACM_CONFIG_FILE || "config.test.yml";
const config = yaml.safeLoad(
  fs.readFileSync(path.join(path.dirname(__dirname), ACM_CONFIG_FILE), "utf8")
);

module.exports = {
  from: [
    /sheetid="[^"]*"/,
    /fieldsurl="[^"]*"/,
    /nextmakerlabsidurl="[^"]*"/,
    /profilephotosfolderid="[^"]*"/
  ],
  to: [
    `sheetid="${config.SPREADSHEET_ID}"`,
    `fieldsurl="${config.FIELDS_URL}"`,
    `nextmakerlabsidurl="${config.NEXT_MAKERLABS_ID_URL}"`,
    `profilephotosfolderid="${config.PROFILE_PHOTOS_FOLDER_ID}"`
  ],
  files: "build/es6-bundled/view-user-page.html"
};
