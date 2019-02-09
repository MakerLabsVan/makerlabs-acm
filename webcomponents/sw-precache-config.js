/// @addtogroup webcomponents
/// @{
/// @file
/// @brief Service Worker response caching config
module.exports = {
  staticFileGlobs: [
    "manifest.json",
    "src/**/*",
    "node_modules/@material/layout-grid/dist/mdc.layout-grid.min.css",
    "node_modules/web-animations-js/web-animations-next.min.js",
    "node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js",
    "node_modules/fetch-jsonp/build/fetch-jsonp.js",
  ],
  runtimeCaching: [
    {
      urlPattern: /\/__\/firebase\//,
      handler: "cacheFirst",
    },
    {
      urlPattern: /^https:\/\/apis.google.com\/js\/api.js/,
      handler: "fastest",
    },
    {
      urlPattern: /^https:\/\/fonts.gstatic.com\//,
      handler: "fastest",
    },
    {
      urlPattern: /\/google_apps_script_proxy\/.*?href=users-fields/,
      handler: "fastest",
    },
  ],
};
/// @}
