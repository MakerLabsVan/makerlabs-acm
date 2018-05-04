{
  "request": {
    "method": "POST",
    "uri": "https://www.googleapis.com/oauth2/v4/token",
    "body": "grant_type=refresh_token&client_id=@CONFIG_OAUTH_CLIENT_ID@&client_secret=@CONFIG_OAUTH_CLIENT_SECRET@&refresh_token=@CONFIG_OAUTH_REFRESH_TOKEN@",
    "headers": [
      { "k": "Content-Type", "v": "application/x-www-form-urlencoded" }
    ]
  },
  "desired_format": "JsonPath",
  "object_path": ".access_token"
}
