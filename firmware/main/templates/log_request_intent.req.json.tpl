{
  "request": {
    "method": "POST",
    "uri": "https://content-sheets.googleapis.com/v4/spreadsheets/@CONFIG_SPREADSHEET_ID@/values/Logs:append",
    "query": [
      { "k": "insertDataOption", "v": "INSERT_ROWS" },
      { "k": "valueInputOption", "v": "USER_ENTERED" }
    ],
    "headers": [
      { "k": "Content-Type", "v": "application/json" }
    ]
  },
  "desired_format": "JsonPath",
  "object_path": ".updates.updatedRows"
}
