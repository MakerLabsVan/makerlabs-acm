module.exports = {
  from: [
    /sheetid="[^"]*"/,
    /fieldsurl="[^"]*"/,
    /nextmakerlabsidurl="[^"]*"/,
    /profilephotosfolderid="[^"]*"/
  ],
  to: [
    'sheetid="1j4SIaQWzUO7LrVK_94p1n_SR70Og9ZycUm3GHVMY0zE"',
    'fieldsurl="/google_apps_script_proxy/a/makerlabs.com/macros/s/AKfycbzdJ6CbHD0Uqn2H2HEUyl13w2UPr0c0ztun8jdXykUh88mUE9ly/exec?href=users-fields"',
    'nextmakerlabsidurl="/google_apps_script_proxy/a/makerlabs.com/macros/s/AKfycbzdJ6CbHD0Uqn2H2HEUyl13w2UPr0c0ztun8jdXykUh88mUE9ly/exec?href=next-makerlabs-id"',
    'profilephotosfolderid="1a3fKhzE1FCiJPV79acM7pkUp6WLM1w6s"'
  ],
  files: "build/es6-bundled/view-user-page.html"
};
