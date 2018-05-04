{
  "request": {
    "method": "GET",
    "uri": "https://docs.google.com/spreadsheets/d/@CONFIG_SPREADSHEET_ID@/gviz/tq",
    "query": [
      { "k": "gid", "v": "0" },
      { "k": "tq", "v": "limit 0" }
    ],
    "headers": [
      { "k": "X-DataSource-Auth", "v": "force-json-workaround" }
    ]
  },
  "desired_format": "JsonPathAsFlatbuffers",
  "object_path": ".table",
  "root_type": "Sheets.Datatable",
  "schema_text": "namespace Sheets;\n\nenum DatatableColumnType : byte\n{\n  boolean,\n  number,\n  string,\n  date,\n  datetime,\n  timeofday,\n}\n\ntable DatatableCell\n{\n  v: string;\n}\n\ntable DatatableRow\n{\n  c: [DatatableCell];\n}\n\ntable DatatableColumn\n{\n  id: string;\n  label: string;\n  pattern: string;\n  type: DatatableColumnType;\n  // p: ?\n}\n\ntable Datatable\n{\n  rows: [DatatableRow];\n  cols: [DatatableColumn];\n}\n\ntable DatatableResponse\n{\n  version: string;\n  reqId: string;\n  status: string;\n  sig: string;\n  table: Datatable;\n}\n\nfile_identifier \"Dtab\";\n\u0000"
}
