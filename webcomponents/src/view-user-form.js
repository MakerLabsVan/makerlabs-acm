import {LitElement, html} from "@polymer/lit-element";

/* Prereqs */
//import "web-animations-js/web-animations-next-lite.min.js";
//import "@polymer/neon-animation/web-animations.js";
import "@polymer/iron-icons/iron-icons.js";

/* Material Design Card/Item Components */
import "@polymer/paper-item/paper-item.js";
import "@polymer/paper-item/paper-icon-item.js";
import "@polymer/paper-item/paper-item-body.js";
import "@polymer/paper-card/paper-card.js";

/* Material Design Form Components */
import "@polymer/paper-input/paper-input.js";
import "@polymer/paper-checkbox/paper-checkbox.js";
import "@polymer/paper-dropdown-menu/paper-dropdown-menu.js";
import "@polymer/paper-listbox/paper-listbox.js";
import "@polymer/paper-radio-group/paper-radio-group.js";
import "@polymer/paper-radio-button/paper-radio-button.js";
import "@polymer/paper-fab/paper-fab.js";
import "@polymer/paper-tooltip/paper-tooltip.js";

/* Vaadin Components */
import "@vaadin/vaadin-combo-box/theme/material/vaadin-combo-box.js";
import "@vaadin/vaadin-date-picker/theme/material/vaadin-date-picker-light.js";

import "timeago.js/dist/timeago.js";

/* Local Components */
import "./image-file-uploader.js";

class ViewUserForm extends LitElement {
  static get properties() {
    return {
      sheetId: {
        type: String,
      },
      machineId: {
        type: String,
      },
      accessToken: {
        type: String,
      },
      fields: {
        type: Array,
      },
      userName: {
        type: String,
        observer: "handleUserNameChanged",
      },
      query: {
        type: Object,
      },
      defaultPhotoUrl: {
        type: String,
      },
    };
  }

  constructor() {
    super();
    this.fields = this.fields || [];
    this.query = this.query || {};

    if (window && window.location) {
      const url = new URL(window.location);
      const queryParams = new URLSearchParams(url.search.slice(1));
      for (var [k, v] of queryParams) {
        this.query[k] = v;
      }
    }
  }

  _render(props) {
    return html`
    <link rel="stylesheet" href="../node_modules/@material/layout-grid/dist/mdc.layout-grid.min.css">
    <style>
      .full-width {
        width: 100%;
      }

      .content-wrapper {
        position: relative;
      }

      .tool-bar {
        position: fixed;
        height: 50px;
        bottom: 10px;
        right: 16px;
        z-index: 1;
      }

      .tool-bar .tool-bar-action {
        display: inline-block;
      }

      paper-fab {
        --paper-fab-background: #1E88E5;
      }

      #input {
        padding-top: 5px;
      }
    </style>

    <google-client-loader
      id="sheets"
      name="sheets"
      version="v4"
    ></google-client-loader>

    <div class="content-wrapper">
      <form onsubmit="return false;" id="viewUserForm">
        <div class="tool-bar">
          <div class="tool-bar-action">
            <paper-fab
              mini=""
              icon="add"
              on-tap="${this.resetValues.bind(this)}"
            ></paper-fab>
            <paper-tooltip
              position="top"
              animation-delay="0"
            >Add new user</paper-tooltip>
          </div>

          <div class="tool-bar-action">
            <paper-fab
              mini=""
              icon="save"
              on-tap="${this.handleSubmit.bind(this)}"
            ></paper-fab>
            <paper-tooltip
              position="top"
              animation-delay="0"
            >Save changes</paper-tooltip>
          </div>
        </div>

        <div class="mdc-layout-grid">
          <div class="mdc-layout-grid__inner">
            ${props.fields.map(
              (section) => html`
                <paper-card
                  heading="${section.title}"
                  class="mdc-layout-grid__cell mdc-layout-grid__cell--span-3"
                  hidden="${this.sectionIsHidden(section)}"
                >
                  <div class="card-content style-scope form">
                    ${section.fields.map(this.renderField.bind(this))}
                  </div>
                </paper-card>
              `
            )}
          </div>
        </div>
      </form>
    </div>
    `;
  }

  renderField(field) {
    if (this.fieldIsCheckboxType(field)) {
      return html`
        <div>
          <paper-checkbox
            name="${field.name}"
            id="${field.name}"
          >${field.title}</paper-checkbox>
        </div>
      `;
    }

    if (this.fieldIsRadioGroupType(field)) {
      return html`
        <div>
          <span>${field.title}</span>
          <paper-radio-group
            name="${field.name}"
            id="${field.name}"
            items="${field.choices}"
            selected="0"
          >
            ${field.choices.map(
              (choice) => html`
                <paper-radio-button
                  name="${choice}"
                >${choice}</paper-radio-button>
              `
            )}
          </paper-radio-group>
        </div>
      `;
    }

    if (this.fieldIsDropdownMenuType(field)) {
      return html`
        <paper-dropdown-menu
          label="${field.title}"
          name="${field.name}"
          id="${field.name}"
          class="full-width"
        >
          <paper-listbox
            slot="dropdown-content"
            selected="0"
          >
            ${field.choices.map(
              (choice) => html`
                <paper-item>${choice}</paper-item>
              `
            )}
          </paper-listbox>
        </paper-dropdown-menu>
      `;
    }

    if (this.fieldIsDatePickerType(field)) {
      return html`
        <vaadin-date-picker-light attr-for-value="value" class="full-width">
          <paper-input
            always-float-label=""
            label="${field.title}"
            name="${field.name}"
            id="${field.name}"
          ></paper-input>
        </vaadin-date-picker-light>
      `;
    }

    if (this.fieldIsImageType(field)) {
      return html`
        <image-file-uploader
          id="${field.name}"
          name="${field.name}"
        ></image-file-uploader>
      `;
    }

    if (this.fieldIsTextInputType(field)) {
      return html`
        <paper-input
          always-float-label=""
          label="${field.title}"
          id="${field.name}"
          name="${field.name}"
        ></paper-input>
      `;
    }

    if (this.fieldIsAlertsType(field)) {
      return html`
        <paper-input
          always-float-label=""
          auto-validate pattern=""
          error-message="Resolve at Front Desk"
          label="${field.title}"
          id="${field.name}"
          name="${field.name}"
        ></paper-input>
      `;
    }

    if (this.fieldIsTagIdType(field)) {
      return html`
        <vaadin-combo-box
          label="${field.title}"
          id="${field.name}"
          name="${field.name}"
          item-value-path="tagId"
          item-label-path="tagId"
          allow-custom-value="true"
          class="full-width"
        >
          <template>
            <paper-item>
              <paper-item-body two-line="" style="min-height: 0">
                <div>[[item.tagId]]</div>
                <div secondary="" class="timeago" datetime="[[item.timestamp]]">[[item.timestamp]]</div>
              </paper-item-body>
            </paper-icon-item>
          </template>
        </vaadin-combo-box>
      `;
    }
  }

  get usersSheetName() {
    return "Users";
  }
  get usersSheetNumHeaders() {
    return 2;
  }

  get activitySheetName() {
    return "Activity";
  }
  get activitySheetNumHeaders() {
    return 2;
  }

  get hiddenSectionNames() {
    return ["Initial", "Hidden", "Private"];
  }

  get usersNameColumn() {
    return this.usersColumnFromFieldTitle("Maker Info", "Name");
  }
  get usersMakerLabsIdColumn() {
    return this.usersColumnFromFieldTitle("Membership Info", "MakerLabs ID");
  }
  get usersAlertsColumn() {
    return this.usersColumnFromFieldTitle("Membership Info", "Alerts");
  }
  get usersTagIdColumn() {
    return this.usersColumnFromFieldTitle("Access & Studio", "Tag ID");
  }

  get activityTimestampColumn() {
    return "A";
  }
  get activityMachineIdColumn() {
    return "B";
  }
  get activityTypeColumn() {
    return "C";
  }
  get activityTagIdColumn() {
    return "E";
  }
  get activityMakerLabsIdColumn() {
    return "F";
  }

  sectionIsHidden(section) {
    return section && this.hiddenSectionNames.indexOf(section.title) != -1;
  }

  // https://developers.google.com/apps-script/reference/spreadsheet/data-validation-criteria#properties
  fieldIsCheckboxType(field) {
    return (
      field.type === "CHECKBOX" ||
      (field.type === "VALUE_IN_LIST" &&
        field.choices &&
        field.choices.length == 2 &&
        this.isNoLike(field.choices[0]) &&
        this.isYesLike(field.choices[1]))
    );
  }

  fieldIsRadioGroupType(field) {
    return (
      field.type === "VALUE_IN_LIST" &&
      field.choices &&
      field.choices.length <= 3 &&
      !this.fieldIsCheckboxType(field)
    );
  }

  fieldIsDropdownMenuType(field) {
    return (
      field.type === "VALUE_IN_LIST" &&
      field.choices &&
      field.choices.length > 3
    );
  }

  fieldIsDatePickerType(field) {
    return (
      field.type == "DATE_AFTER" ||
      field.type == "DATE_BEFORE" ||
      field.type == "DATE_BETWEEN" ||
      field.type == "DATE_EQUAL_TO" ||
      field.type == "DATE_IS_VALID_DATE" ||
      field.type == "DATE_NOT_BETWEEN" ||
      field.type == "DATE_ON_OR_AFTER" ||
      field.type == "DATE_ON_OR_BEFORE"
    );
  }

  fieldIsTextInputType(field) {
    return (
      !this.fieldIsTagIdType(field) &&
      !this.fieldIsAlertsType(field) &&
      (!field.type ||
        field.type == "NUMBER_BETWEEN" ||
        field.type == "NUMBER_EQUAL_TO" ||
        field.type == "NUMBER_GREATER_THAN" ||
        field.type == "NUMBER_GREATER_THAN_OR_EQUAL_TO" ||
        field.type == "NUMBER_LESS_THAN" ||
        field.type == "NUMBER_LESS_THAN_OR_EQUAL_TO" ||
        field.type == "NUMBER_NOT_BETWEEN" ||
        field.type == "NUMBER_NOT_EQUAL_TO" ||
        field.type == "TEXT_CONTAINS" ||
        field.type == "TEXT_DOES_NOT_CONTAIN" ||
        field.type == "TEXT_EQUAL_TO" ||
        field.type == "TEXT_IS_VALID_EMAIL")
    );
  }

  fieldIsAlertsType(field) {
    return field.name === this.usersAlertsColumn;
  }

  fieldIsTagIdType(field) {
    return field.name === this.usersTagIdColumn;
  }

  fieldIsImageType(field) {
    return field.type === "TEXT_IS_VALID_URL";
  }

  usersColumnFromFieldTitle(prefixOrTitle, title) {
    const prefix = title ? prefixOrTitle : "";
    if (!title) {
      title = prefixOrTitle;
    }

    // Check for non-empty fields array
    if (this.fields && this.fields.length) {
      // Iterate through sections
      for (var s = 0; s < this.fields.length; ++s) {
        var section = this.fields[s];

        // Iterate through fields within the section
        for (var f = 0; f < section.fields.length; ++f) {
          // Extract a candidate field
          var field = section.fields[f];

          // If a prefix was provided, check if it matches and the title follows
          if (prefix.length) {
            var prefixStart = field.title.indexOf(prefix);
            if (prefixStart === 0) {
              var titleStart = field.title.indexOf(
                title,
                prefixStart + prefix.length + 1 // add a ' ' after prefix
              );
              if (
                titleStart === 0 &&
                titleStart + title.length === field.length - 1
              ) {
                return field.name;
              }
            }
          }

          // Either a prefix was not provided, or it failed to match.
          // Check for an exact match
          if (field.title == title) {
            return field.name;
          }
        }
      }
    }

    return null;
  }

  async handleUserNameChanged(newValue, oldValue) {
    if (newValue) {
      // Search for user by name (if already entered), display in form
      if (this.usersNameColumn && this.userName) {
        const datatable = await this.queryUsers(
          `where ${this.usersNameColumn} = '${this.userName}'`
        );
        var values = this.getFirstRowValuesFromDatatable(datatable);
        if (values && values.length) {
          this.showUser(values);
        }
      }
    }
  }

  async _firstRendered() {
    // Add callback to update styles on resize
    var sheets = this.shadowRoot.getElementById("sheets");
    sheets.onSheetsApiLoaded = function() {
      console.log("onSheetsApiLoaded");
    };
    sheets.onSheetsApiLoadError = function() {
      console.log("onSheetsApiLoadError");
    };

    // Search for recently scanned tags, prefill the Tag ID dropdown
    this.updateRecentTagIds();

    // Periodically update the Tag ID dropdown with recently scanned tags
    var pollRecentTagIdsIntervalMillis = 10000;
    window.setInterval(
      this.updateRecentTagIds.bind(this),
      pollRecentTagIdsIntervalMillis
    ); // repeat forever
  }

  async updateFormFromMostRecentScan() {
    if (this.fields && this.usersMakerLabsIdColumn) {
      //TODO: not hard-coded
      const datatable = await this.queryActivity(
        "select " +
          this.activityMakerLabsIdColumn +
          " where " +
          this.activityTypeColumn +
          " = 'Signed_In' and " +
          this.activityMachineIdColumn +
          " = '" +
          this.machineId +
          "' order by " +
          this.activityTimestampColumn +
          " desc limit 1"
      );

      var activityValues = this.getValuesFromDatatable(datatable);
      if (activityValues && activityValues.length) {
        var makerLabsIdPrev = "";
        for (var rowIdx = 0; rowIdx < activityValues.length; rowIdx++) {
          var makerLabsId = activityValues[rowIdx][0] || "";
          if (makerLabsId != makerLabsIdPrev) {
            const datatable = await this.queryUsers(
              "where " +
                this.usersMakerLabsIdColumn +
                " = '" +
                makerLabsId +
                "'"
            );
            var userValues = this.getFirstRowValuesFromDatatable(datatable);
            if (userValues && userValues.length) {
              this.showUser(userValues);
            }

            makerLabsIdPrev = makerLabsId;
          }
        }
      }
    }
  }

  async updateRecentTagIds() {
    const el = this.shadowRoot.getElementById(this.usersTagIdColumn);
    if (el) {
      const sinceDuration = 2 * 60 * 1000; // 2 mins
      const sinceTimestamp = Date.now() - sinceDuration;

      //TODO: not hard-coded
      const datatable = await this.queryActivity(
        "select " +
          this.activityTagIdColumn +
          ",max(" +
          this.activityMakerLabsIdColumn +
          "),max(" +
          this.activityTimestampColumn +
          ") where " +
          this.activityTimestampColumn +
          " > " +
          sinceTimestamp +
          " group by " +
          this.activityTagIdColumn +
          " limit 5"
      );
      var items = [];
      var values = this.getValuesFromDatatable(datatable);
      if (values) {
        for (var rowIdx = 0; rowIdx < values.length; rowIdx++) {
          var tagId = values[rowIdx][0];
          var makerLabsId = values[rowIdx][1];
          var timestampMillis = values[rowIdx][2];
          var timestamp = new Date(timestampMillis);

          if (!makerLabsId || makerLabsId.length == 0) {
            items.push({
              tagId,
              timestamp: timeago().format(timestamp),
            });
          }
        }

        el.items = items;
      }
    }
  }

  getValuesFromDatatable(datatable, limit) {
    var values = [];
    if (
      datatable &&
      datatable.table &&
      datatable.table.rows &&
      datatable.table.rows.length > 0 &&
      datatable.table.cols &&
      datatable.table.cols.length > 0
    ) {
      limit =
        limit < datatable.table.rows.length
          ? limit
          : datatable.table.rows.length;
      for (var rowIdx = 0; rowIdx < limit; rowIdx++) {
        var rowValues = [];

        for (var colIdx = 0; colIdx < datatable.table.cols.length; colIdx++) {
          var v =
            datatable.table.rows[rowIdx].c[colIdx] &&
            datatable.table.rows[rowIdx].c[colIdx].v;
          rowValues.push(v);
        }

        values.push(rowValues);
      }
    }

    return values;
  }

  getFirstRowValuesFromDatatable(datatable) {
    const limitFirstRowValues = this.getValuesFromDatatable(datatable, 1);
    return limitFirstRowValues.length > 0 ? limitFirstRowValues[0] : null;
  }

  isYesLike(s) {
    var yesLike = ["☑", "Y", "y", "T", "t", "Yes", "yes", "True", "true"];
    return yesLike.indexOf(s) != -1;
  }

  isNoLike(s) {
    var noLike = ["☐", "N", "n", "F", "f", "No", "no", "False", "false"];
    return noLike.indexOf(s) != -1;
  }

  // https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript#answer-16436975
  arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;

    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  querySheet(sheetName, query, numHeaders = 1) {
    var queryString = encodeURIComponent(query);

    const responseHandlerName = `jsonp_${Date.now()}_${Math.ceil(
      Math.random() * 100000
    )}`;
    const query_url =
      "https://docs.google.com/spreadsheets/d/" +
      this.sheetId +
      "/gviz/tq" +
      "?access_token=" +
      this.accessToken +
      "&sheet=" +
      sheetName +
      "&headers=" +
      numHeaders +
      "&tq=" +
      queryString +
      "&tqx=responseHandler:" +
      responseHandlerName;

    // Execute the request, return a parsed JSON datatable
    return (
      fetchJsonp(query_url, {
        jsonpCallback: "responseHandler",
        jsonpCallbackFunction: responseHandlerName,
      })
        // Parse JSON response body
        .then(function(response) {
          return response.json();
        })
        .catch(function(err) {
          console.log("Parsing Google Visualization API response failed", err);
        })
    );
  }

  queryUsers(query) {
    return this.querySheet(
      this.usersSheetName,
      query,
      this.usersSheetNumHeaders
    );
  }

  queryActivity(query) {
    return this.querySheet(
      this.activitySheetName,
      query,
      this.activitySheetNumHeaders
    );
  }

  resetValues() {
    return this.showUser([]);
  }

  showUser(data) {
    var i = 0;
    for (var s = 0; s < this.fields.length; ++s) {
      var section = this.fields[s];

      for (var f = 0; f < section.fields.length; ++f) {
        var val = i < data.length ? data[i++] : null;
        var field = section.fields[f];
        var el = this.shadowRoot.getElementById(field.name);

        if (!val) {
          // Clear the previous value, if no new value is set.
          val = "";
        }

        if (this.fieldIsCheckboxType(field)) {
          el.checked = this.isYesLike(val[0]);
        } else if (this.fieldIsRadioGroupType(field)) {
          el.select(val);
        } else if (this.fieldIsDropdownMenuType(field)) {
          var listbox = el.querySelector("paper-listbox");
          var selectedIdx = field.choices.indexOf(val);

          listbox.selected = selectedIdx >= 0 ? selectedIdx : 0;
        } else if (
          this.fieldIsDatePickerType(field) ||
          this.fieldIsTextInputType(field) ||
          this.fieldIsAlertsType(field) ||
          this.fieldIsTagIdType(field)
        ) {
          el.value = val;
        } else if (this.fieldIsImageType(field)) {
          var photoUrl = val || this.defaultPhotoUrl;
          el.src = photoUrl;
        } else {
          console.log(`unknown field name ${field.name}, type ${field.type}`);
        }
      }
    }
  }

  async handleSubmit() {
    var sheets = this.shadowRoot.getElementById("sheets");

    var validTextFieldCount = 0;
    var formValues = [];
    for (var s = 0; s < this.fields.length; ++s) {
      var section = this.fields[s];

      for (var f = 0; f < section.fields.length; ++f) {
        var formValue;
        var field = section.fields[f];

        var el = this.shadowRoot.getElementById(field.name);
        if (el) {
          if (this.fieldIsCheckboxType(field)) {
            formValue = el.checked ? field.choices[0] : field.choices[1];
          } else if (this.fieldIsRadioGroupType(field)) {
            formValue = el.selected;
          } else if (this.fieldIsDropdownMenuType(field)) {
            formValue = el.value;
          } else if (
            this.fieldIsDatePickerType(field) ||
            this.fieldIsTextInputType(field)
          ) {
            formValue = el.value;

            // Check whether any non-empty text value was supplied
            if (formValue) {
              validTextFieldCount++;
            }
          } else if (this.fieldIsImageType(field)) {
            // Ignore emptyImageData
            if (el.src != el.emptyImageData) {
              formValue = el.src;
            }
          } else if (this.fieldIsAlertsType(field)) {
            formValue = el.value;
          } else if (this.fieldIsTagIdType(field)) {
            formValue = el.value;
          } else {
            console.log(`unknown field ${field.name}`);
          }
        }

        formValues.push(formValue);
      }
    }

    if (sheets && sheets.api && formValues.length) {
      var rowName = formValues[0];

      if (rowName) {
        // Clear row value, it will be supplied by the ARRAYFORMULA
        //formValues[0] = null;
        console.log(`Update '${this.usersSheetName}' row ${rowName}`);
        const response = await sheets.api.spreadsheets.values.update({
          spreadsheetId: this.sheetId,
          range: `${this.usersSheetName}!A${rowName}`,
          majorDimension: "ROWS",
          valueInputOption: "USER_ENTERED",
          values: [formValues],
        });
        console.log(response);
      } else {
        if (validTextFieldCount > 0) {
          console.log(`Insert new '${this.usersSheetName}' row`);
          //formValues[0] = null; // First column formula will provide row()
          formValues[0] = "=row()"; // First column formula will provide row()

          const response = await sheets.api.spreadsheets.values.append({
            spreadsheetId: this.sheetId,
            range: this.usersSheetName,
            valueInputOption: "USER_ENTERED",
            insertDataOption: "INSERT_ROWS",
            values: [formValues],
          });
          console.log(response);
        }
      }
    }
  }
}

customElements.define("view-user-form", ViewUserForm);
