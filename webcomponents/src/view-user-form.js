import {LitElement, html} from "@polymer/lit-element";

// Prereqs
import "@polymer/iron-icons/iron-icons.js";

// Material Design Card/Item Components
import "@polymer/paper-item/paper-item.js";
import "@polymer/paper-item/paper-icon-item.js";
import "@polymer/paper-item/paper-item-body.js";
import "@polymer/paper-card/paper-card.js";
import "@polymer/paper-spinner/paper-spinner-lite.js";

// Material Design Form Components
import "@polymer/paper-input/paper-input.js";
import "@polymer/paper-checkbox/paper-checkbox.js";
import "@polymer/paper-dropdown-menu/paper-dropdown-menu.js";
import "@polymer/paper-listbox/paper-listbox.js";
import "@polymer/paper-radio-group/paper-radio-group.js";
import "@polymer/paper-radio-button/paper-radio-button.js";
import "@polymer/paper-fab/paper-fab.js";
import "@polymer/paper-tooltip/paper-tooltip.js";

// Vaadin Components
import "@vaadin/vaadin-combo-box/theme/material/vaadin-combo-box.js";
import "@vaadin/vaadin-date-picker/theme/material/vaadin-date-picker.js";

import "timeago.js/dist/timeago.js";

// Local Components
import "./image-file-uploader.js";
import beep from "./beep.js";

class ViewUserForm extends LitElement {
  static get properties() {
    return {
      sheetId: {
        type: String,
      },
      nextMakerLabsIdUrl: {
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
      profilePhotosFolderId: {
        type: String,
      },
    };
  }

  constructor() {
    super();
    this.fields = [];
    this.query = {};

    if (window && window.location) {
      const url = new URL(window.location);
      const queryParams = new URLSearchParams(url.search.slice(1));
      for (var [k, v] of queryParams) {
        this.query[k] = v;
      }
    }
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has("fields")) {
      var datepickers = this.shadowRoot.querySelectorAll(
        //"vaadin-date-picker-light"
        "vaadin-date-picker"
      );
      for (var d = 0; d < datepickers.length; d++) {
        const datepicker = datepickers[d];

        datepicker.checkValidity = (value) => {
          const parts = value && value.split("-");
          return (
            !value ||
            value.length === 0 ||
            (parts.length == 3 &&
              parts[0].length == 4 &&
              parts[1].length == 2 &&
              parts[2].length == 2)
          );
        };

        datepicker.i18n.formatDate = (d) => {
          const yearStr = (d.year + "").replace(
            /\d+/,
            (y) => "0000".substr(y.length) + y
          );
          const month = d.month + 1;
          const monthStr = (month + "").replace(
            /\d+/,
            (m) => "00".substr(m.length) + m
          );
          const dayStr = (d.day + "").replace(
            /\d+/,
            (d) => "00".substr(d.length) + d
          );
          return [yearStr, monthStr, dayStr].join("-");
        };

        datepicker.i18n.parseDate = (text) => {
          const parts = text.split("-"),
            today = new Date();
          let date,
            month = today.getMonth(),
            year = today.getFullYear();
          if (3 === parts.length) {
            year = parseInt(parts[0]);
            if (3 > parts[0].length && 0 <= year) {
              year += 50 > year ? 2e3 : 1900;
            }
            month = parseInt(parts[1]) - 1;
            date = parseInt(parts[0]);
          } else if (2 === parts.length) {
            month = parseInt(parts[1]) - 1;
            date = parseInt(parts[0]);
          } else if (1 === parts.length) {
            date = parseInt(parts[1]);
          }
          if (date !== void 0) {
            return {day: date, month, year};
          }
        };

        datepicker.addEventListener("value-changed", (e) => {
          e.target.blur();
        });
      }
    }
  }

  render() {
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
            <paper-spinner-lite
              id="is-saving-spinner"
            ></paper-spinner-lite>
          </div>
          <div class="tool-bar-action">
            <paper-fab
              mini
              icon="add"
              @tap="${this.populateNewUser.bind(this)}"
            ></paper-fab>
            <paper-tooltip
              position="top"
              animation-delay="0"
            >Add new user</paper-tooltip>
          </div>

          <div class="tool-bar-action">
            <paper-fab
              mini
              icon="save"
              @tap="${this.handleSubmit.bind(this)}"
            ></paper-fab>
            <paper-tooltip
              position="top"
              animation-delay="0"
            >Save changes</paper-tooltip>
          </div>
        </div>

        <div class="mdc-layout-grid">
          <div class="mdc-layout-grid__inner">
            ${this.fields.map(
              (section) => html`
                <paper-card
                  heading="${section.title}"
                  class="mdc-layout-grid__cell mdc-layout-grid__cell--span-3"
                  ?hidden="${this.sectionIsHidden(section)}"
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
        <vaadin-date-picker class="full-width"
          label="${field.title}"
          name="${field.name}"
          id="${field.name}"
        ></vaadin-date-picker>
      `;
    }

    if (this.fieldIsImageType(field)) {
      return html`
        <image-file-uploader
          id="${field.name}"
          name="${field.name}"
          parentFolderId="${this.profilePhotosFolderId}"
        ></image-file-uploader>
      `;
    }

    if (this.fieldIsTextInputType(field)) {
      return html`
        <paper-input
          always-float-label
          label="${field.title}"
          id="${field.name}"
          name="${field.name}"
        ></paper-input>
      `;
    }

    if (this.fieldIsAlertsType(field)) {
      return html`
        <paper-input
          always-float-label
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
              <paper-item-body two-line style="min-height: 0">
                <div>[[item.tagId]]</div>
                <div secondary class="timeago" datetime="[[item.timestamp]]">[[item.timestamp]]</div>
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

  get usersRowColumn() {
    return this.usersColumnFromFieldTitle("Hidden", "Row");
  }
  get usersNameColumn() {
    return this.usersColumnFromFieldTitle("Maker Info", "Name");
  }
  get usersEmailColumn() {
    return this.usersColumnFromFieldTitle("Maker Info", "Email");
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
          this.showUserRow(values);
        }
      }
    }
  }

  async firstUpdated(changedProperties) {
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
            var didUpdateForm = this.updateFormFromMakerLabsId(makerLabsId);
            if (didUpdateForm) {
              makerLabsIdPrev = makerLabsId;
            }
          }
        }
      }
    }
  }

  async updateFormFromMakerLabsId(makerLabsId) {
    const datatable = await this.queryUsers(
      "where " + this.usersMakerLabsIdColumn + " = '" + makerLabsId + "'"
    );
    var userValues = this.getFirstRowValuesFromDatatable(datatable);
    if (userValues && userValues.length) {
      this.showUserRow(userValues);
      return true;
    }

    return false;
  }

  async updateRecentTagIds() {
    const el = this.shadowRoot.getElementById(this.usersTagIdColumn);
    if (el) {
      const sinceDuration = 2 * 60 * 1000; // 2 mins
      const sinceTimestamp = Date.now() - sinceDuration;

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
          var c = datatable.table.rows[rowIdx].c[colIdx];
          var v = c && (c.f ? c.f : c.v);
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
    if (!this.accessToken) {
      console.log("Early exit from querySheet, no access token set");
      return null;
    }

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
    this.showUserRow([]);
  }

  populateNewUser() {
    // Clear the row and send an event (do not use resetValues)
    this.showUserRow([]);
    this.dispatchEvent(new CustomEvent("reset-form"));
    this.populateNextMakerLabsId();
  }

  showUserObj(user) {
    if (user.alerts) {
      beep();
    }

    const nameField = this.fieldForColumnId(this.usersNameColumn);
    if (nameField && user.name) {
      this.updateField(nameField, user.name);
    }

    const emailField = this.fieldForColumnId(this.emailsNameColumn);
    if (emailField && user.email) {
      this.updateField(emailField, user.email);
    }

    const makerLabsIdField = this.fieldForColumnId(this.usersMakerLabsIdColumn);
    if (makerLabsIdField && user.makerlabsId) {
      this.updateField(makerLabsIdField, user.makerlabsId);
    }

    const alertsField = this.fieldForColumnId(this.usersAlertsColumn);
    if (alertsField && user.alerts) {
      this.updateField(alertsField, user.alerts);
    }

    const tagIdField = this.fieldForColumnId(this.usersTagIdColumn);
    if (tagIdField && user.tagId) {
      this.updateField(tagIdField, user.tagId);
    }
  }

  showUserRow(data) {
    var i = 0;
    for (var s = 0; s < this.fields.length; ++s) {
      var section = this.fields[s];

      for (var f = 0; f < section.fields.length; ++f) {
        var val = i < data.length ? data[i++] : null;
        var field = section.fields[f];

        this.updateField(field, val);
      }
    }
  }

  updateField(field, val) {
    if (field.name) {
      var el = this.shadowRoot.getElementById(field.name);
      if (!el) {
        console.log("Invalid el for field.name = " + field.name);
      }
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
      } else if (this.fieldIsDatePickerType(field)) {
        // Blur the date picker input, vaadin-date-picker does not do this?
        const textField = el.shadowRoot.querySelector("vaadin-text-field");
        if (textField) {
          textField.value = "";
          textField.blur();
        }

        el.value = val;
      } else if (
        this.fieldIsTextInputType(field) ||
        this.fieldIsAlertsType(field) ||
        this.fieldIsTagIdType(field)
      ) {
        el.value = val;
      } else if (this.fieldIsImageType(field)) {
        var photoUrl = val || this.defaultPhotoUrl;
        el.src = photoUrl;
      } else {
        console.log(`Unknown field name ${field.name}, type ${field.type}`);
      }
    } else {
      console.log(`Missing field name`);
    }
  }

  fieldForColumnId(columnId) {
    var i = 0;
    for (var s = 0; s < this.fields.length; ++s) {
      var section = this.fields[s];

      for (var f = 0; f < section.fields.length; ++f) {
        var field = section.fields[f];

        if (field.name == columnId) {
          return field;
        }
      }
    }

    return null;
  }

  async populateNextMakerLabsId() {
    if (
      !this.accessToken ||
      this.accessToken === "null" ||
      this.accessToken === "undefined"
    ) {
      console.log(
        "Early exit from populateNextMakerLabsId, no access token set"
      );
      return null;
    }

    const response = await fetch(this.nextMakerLabsIdUrl, {
      mode: "cors",
      credentials: "omit",
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
    if (response.status == 200) {
      const nextMakerLabsId = await response.json();
      const makerLabsIdField = this.fieldForColumnId(
        this.usersMakerLabsIdColumn
      );
      if (makerLabsIdField) {
        this.updateField(makerLabsIdField, nextMakerLabsId);
      }
    } else {
      console.log(
        `Fields JSON request fetch failed with response code: ${
          response.status
        }`
      );
    }
  }

  async setIsSaving(isSaving) {
    var spinner = this.shadowRoot.getElementById("is-saving-spinner");
    spinner.active = isSaving;
    var fabs = this.shadowRoot.querySelectorAll("paper-fab");
    for (var i = 0; i < fabs.length; ++i) {
      fabs[i].disabled = isSaving;
    }
  }

  async handleSubmit() {
    var sheets = this.shadowRoot.getElementById("sheets");

    var validTextFieldCount = 0;
    var validMakerLabsId = false;
    var user = {};
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
          } else if (this.fieldIsDatePickerType(field)) {
            let value = el.value;
            // Check for value in text-field, not detected by vaadin-date-picker
            if (!value) {
              const textField = el.shadowRoot.querySelector(
                "vaadin-text-field"
              );
              if (textField && textField.value) {
                value = textField.value;
              }
            }

            formValue = value;
          } else if (this.fieldIsTextInputType(field)) {
            formValue = el.value;

            // Check whether any non-empty text value was supplied
            if (formValue) {
              if (field.name == this.usersMakerLabsIdColumn) {
                validMakerLabsId = true;
              } else {
                validTextFieldCount++;
              }
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
            console.log(`Unknown field ${field.name}`);
          }
        }

        user[field.title] = formValue;
        formValues.push(formValue);
      }
    }

    if (sheets && sheets.api && formValues.length && validMakerLabsId) {
      var rowName = formValues[0];

      this.setIsSaving(true);

      if (rowName) {
        // Clear row value, it will be supplied by the ARRAYFORMULA
        formValues[0] = null;
        console.log(`Update '${this.usersSheetName}' row ${rowName}`);
        const response = await sheets.api.spreadsheets.values.update({
          spreadsheetId: this.sheetId,
          range: `${this.usersSheetName}!A${rowName}`,
          majorDimension: "ROWS",
          valueInputOption: "USER_ENTERED",
          values: [formValues],
        });
        if (response.status == 200) {
          console.log(
            `Successfully updated '${this.usersSheetName}' row ${rowName}`
          );

          // Emit event with user field names and confirmed values
          user.Row = parseInt(rowName);
          this.dispatchEvent(new CustomEvent("updated-user", {detail: user}));
          this.setIsSaving(false);
        } else {
          console.log(
            `Invalid response received for updating '${this.usersSheetName}' ${
              response.status
            }`
          );
        }
      } else {
        if (validTextFieldCount > 0) {
          console.log(`Insert new '${this.usersSheetName}' row`);
          formValues[0] = null; // First column formula will provide row()

          const response = await sheets.api.spreadsheets.values.append({
            spreadsheetId: this.sheetId,
            range: this.usersSheetName,
            valueInputOption: "USER_ENTERED",
            insertDataOption: "INSERT_ROWS",
            values: [formValues],
          });

          if (response.status == 200) {
            const appendResults = JSON.parse(response.body);
            if (appendResults && appendResults.updates) {
              const updatedRange = appendResults.updates.updatedRange;
              const prefix = `${this.usersSheetName}!A`;
              if (updatedRange && updatedRange.startsWith(prefix)) {
                const newRowName = updatedRange
                  .substr(prefix.length)
                  .split(":")[0];
                console.log(`Successfully created new User row ${newRowName}`);

                // Emit event with user field names and confirmed values
                user.Row = parseInt(newRowName);
                this.dispatchEvent(
                  new CustomEvent("updated-user", {detail: user})
                );
                this.setIsSaving(false);

                const rowField = this.fieldForColumnId(this.usersRowColumn);

                if (rowField) {
                  this.updateField(rowField, newRowName);
                } else {
                  console.log(`Could not find Row column after creating User`);
                }
              }
            }
          } else {
            console.log(
              `Invalid response received for creating new User ${
                response.status
              }`
            );
          }
        }
      }
    } else {
      if (!validMakerLabsId) {
        console.log("Invalid or missing MakerLabs ID");
      } else {
        console.log("Invalid or missing form data");
      }
    }
  }
}

customElements.define("view-user-form", ViewUserForm);
