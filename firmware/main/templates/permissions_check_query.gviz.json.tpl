{
  "select": [
    {
      "prefix": "Maker Info", "label": "Name",
      "id": "??",
      "type": "unknown"
    },
    {
      "prefix": "Maker Info", "label": "Display Name",
      "id": "??",
      "type": "unknown"
    },
    {
      "prefix": "Maker Info", "label": "Email",
      "id": "??",
      "type": "unknown"
    },
    {
      "prefix": "Membership Info", "label": "MakerLabs ID",
      "id": "??",
      "type": "unknown"
    },
    {
      "prefix": "Membership Info", "label": "Alerts",
      "id": "??",
      "type": "unknown"
    },
    {
      "prefix": "Access & Studio", "label": "Tag ID",
      "id": "??",
      "type": "unknown"
    }
  ],

  "where": [
    {
      "column": {
        "prefix": "Access & Studio", "label": "Tag ID",
        "id": "??",
        "type": "unknown"
      },
      "op": "Equals",
      "value": "?????"
    },
    {
      "join_op": "And",
      "column": {
        "prefix": "Permissions", "label": "@CONFIG_PERMISSION_COLUMN_LABEL@",
        "id": "??",
        "type": "unknown"
      },
      "op": "Equals",
      "value": "☑"
    }
  ],

  "limit": 1
}
