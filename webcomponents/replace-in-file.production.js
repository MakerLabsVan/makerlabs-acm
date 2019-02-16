module.exports = {
  from: [
    /sheetId="[^"]*"/,
    /fieldsUrl="[^"]*"/,
    /nextMakerLabsIdUrl="[^"]*"/,
    /profilePhotosFolderId="[^"]*"/
  ],
  to: [
    'sheetId="1j4SIaQWzUO7LrVK_94p1n_SR70Og9ZycUm3GHVMY0zE"',
    'fieldsUrl="/google_apps_script_proxy/a/makerlabs.com/macros/s/AKfycbzdJ6CbHD0Uqn2H2HEUyl13w2UPr0c0ztun8jdXykUh88mUE9ly/exec?href=users-fields"',
    'nextMakerLabsIdUrl="/google_apps_script_proxy/a/makerlabs.com/macros/s/AKfycbzdJ6CbHD0Uqn2H2HEUyl13w2UPr0c0ztun8jdXykUh88mUE9ly/exec?href=next-makerlabs-id"',
    'profilePhotosFolderId="1a3fKhzE1FCiJPV79acM7pkUp6WLM1w6s"'
  ],
  files: "build/es6-bundled/view-user-page.html"
};
