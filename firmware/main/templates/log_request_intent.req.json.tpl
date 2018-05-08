{
  "id": {"ab": 0, "cd": 0},
  "to_pid": {"ab": 0, "cd": 0},
  "request": {
    "method": "POST",
    "uri": "https://content-sheets.googleapis.com/v4/spreadsheets/@CONFIG_SPREADSHEET_ID@/values/Logs:append",
    "query": [
      { "k": "insertDataOption", "v": "INSERT_ROWS" },
      { "k": "valueInputOption", "v": "USER_ENTERED" }
    ],
    "headers": [
      { "k": "Content-Type", "v": "application/json" }
    ],
    "body": ""
  },
  "desired_format": "JsonPath",
  "object_path": ".updates.updatedRows"
}
