/* Prereqs */
/* Layout */
/* Material Design Card/Item Components */
/* Material Design Form Components */
/* Vaadin Components */
/* Google Sign-In, Sheets, Charts, ... */
/* Local Components */
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import { PolymerElement } from "@polymer/polymer/polymer-element.js";

import "web-animations-js/web-animations-next-lite.min.js";
import "@polymer/neon-animation/web-animations.js";
import "@polymer/iron-icons/iron-icons.js";
import "@polymer/app-layout/app-grid/app-grid-style.js";
import "@polymer/paper-item/paper-item.js";
import "@polymer/paper-item/paper-icon-item.js";
import "@polymer/paper-item/paper-item-body.js";
import "@polymer/paper-card/paper-card.js";
import "@polymer/paper-input/paper-input.js";
import "@polymer/paper-checkbox/paper-checkbox.js";
import "@polymer/paper-dropdown-menu/paper-dropdown-menu.js";
import "@polymer/paper-listbox/paper-listbox.js";
import "@polymer/paper-radio-group/paper-radio-group.js";
import "@polymer/paper-radio-button/paper-radio-button.js";
import "@polymer/paper-fab/paper-fab.js";
import "@polymer/paper-tooltip/paper-tooltip.js";
import "vaadin-material-styles/vaadin-date-picker.js";
import "vaadin-material-styles/vaadin-combo-box.js";
import "vaadin-material-styles/vaadin-combo-box-item.js";
import "vaadin-date-picker/vaadin-date-picker-light.js";
import "google-chart/google-chart-loader.js";
import "./image-file-uploader.js";
import { html } from "@polymer/polymer/lib/utils/html-tag.js";
class ViewUserForm extends PolymerElement {
  static get template() {
    return html`
    <style include="app-grid-style">
      :host {
        display: block;
        --app-grid-columns: 4;
        --app-grid-expandible-item-columns: 4;
        --app-grid-gutter: 10px;
        --app-grid-item-height: 720px;
      }

      paper-card:last-child {
        @apply --app-grid-expandible-item;
      }

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

    <google-chart-loader id="gviz"></google-chart-loader>

    <google-client-loader id="sheets" name="sheets" version="v4"></google-client-loader>

    <div class="content-wrapper">
      <form onsubmit="return false;" id="viewUserForm">
        <div class="tool-bar">
          <div class="tool-bar-action">
            <paper-fab mini="" icon="add" on-tap="resetValues"></paper-fab>
            <paper-tooltip position="top" animation-delay="0">Add new user</paper-tooltip>
          </div>

          <div class="tool-bar-action">
            <paper-fab mini="" icon="save" on-tap="handleSubmit"></paper-fab>
            <paper-tooltip position="top" animation-delay="0">Save changes</paper-tooltip>
          </div>
        </div>

        <div class="app-grid">
          <template is="dom-repeat" items="[[fields]]" as="section">
            <paper-card heading="[[section.title]]" class="section" hidden="[[_sectionIsHidden(section)]]">
              <div class="card-content">
                <template is="dom-repeat" items="[[section.fields]]" as="field">

                  <template is="dom-if" if="[[_fieldIsCheckboxType(field)]]" restamp="true">
                    <div>
                      <paper-checkbox name="[[field.name]]" id="[[field.name]]">[[field.title]]</paper-checkbox>
                    </div>
                  </template>

                  <template is="dom-if" if="[[_fieldIsRadioGroupType(field)]]" restamp="true">
                    <div>
                      <span>[[field.title]]</span>
                      <paper-radio-group name="[[field.name]]" id="[[field.name]]" items="[[field.choices]]" selected="0">
                        <template is="dom-repeat" items="[[field.choices]]" as="choice">
                          <paper-radio-button name="[[choice]]">[[choice]]</paper-radio-button>
                        </template>
                      </paper-radio-group>
                    </div>
                  </template>

                  <template is="dom-if" if="[[_fieldIsDropdownMenuType(field)]]" restamp="true">
                    <paper-dropdown-menu label="[[field.title]]" name="[[field.name]]" id="[[field.name]]" class="full-width">
                      <paper-listbox slot="dropdown-content" selected="0">
                        <template is="dom-repeat" items="[[field.choices]]" as="choice">
                          <paper-item>[[choice]]</paper-item>
                        </template>
                      </paper-listbox>
                    </paper-dropdown-menu>
                  </template>

                  <template is="dom-if" if="[[_fieldIsDatePickerType(field)]]" restamp="true">
                    <vaadin-date-picker-light attr-for-value="value" class="full-width">
                      <paper-input always-float-label="" label="[[field.title]]" name="[[field.name]]" id="[[field.name]]"></paper-input>
                    </vaadin-date-picker-light>
                  </template>

                  <template is="dom-if" if="[[_fieldIsImageType(field)]]" restamp="true">
                    <image-file-uploader id="[[field.name]]" name="[[field.name]]"></image-file-uploader>
                  </template>

                  <template is="dom-if" if="[[_fieldIsTextInputType(field)]]" restamp="true">
                    <paper-input always-float-label="" label="[[field.title]]" id="[[field.name]]" name="[[field.name]]"></paper-input>
                  </template>

                  <template is="dom-if" if="[[_fieldIsTagIdType(field)]]" restamp="true">
                    <vaadin-combo-box label="[[field.title]]" id="[[field.name]]" name="[[field.name]]" class="full-width"></vaadin-combo-box>
                  </template>

                </template>
              </div>
            </paper-card>
          </template>
        </div>
      </form>
    </div>
`;
  }

  static get is() {
    return "view-user-form";
  }

  static get properties() {
    return {
      sheetId: {
        type: String
      },
      machineId: {
        type: String
      },
      accessToken: {
        type: String
      },
      fields: {
        type: Array
      },
      userName: {
        type: String,
        observer: "_userNameChanged"
      },
      query: {
        type: Object
      }
    };
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
    return this._usersColumnFromFieldTitle("Name");
  }
  get usersMakerLabsIdColumn() {
    return this._usersColumnFromFieldTitle("MakerLabs ID");
  }
  get usersTagIdColumn() {
    return this._usersColumnFromFieldTitle("Tag ID");
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

  _usersColumnFromFieldTitle(title) {
    // Check for non-empty fields array
    if (this.fields && this.fields.length) {
      // Iterate through sections
      for (var s = 0; s < this.fields.length; ++s) {
        var section = this.fields[s];

        // Iterate through fields within the section
        for (var f = 0; f < section.fields.length; ++f) {
          // Extract a candidate field
          var field = section.fields[f];
          // Check if the title matches
          if (field.title == title) {
            return field.name;
          }
        }
      }
    }

    return null;
  }

  _sectionIsHidden(section) {
    return section && this.hiddenSectionNames.indexOf(section.title) != -1;
  }

  // https://developers.google.com/apps-script/reference/spreadsheet/data-validation-criteria#properties
  _fieldIsCheckboxType(field) {
    return (
      field.type === "CHECKBOX" ||
      (field.type === "VALUE_IN_LIST" &&
        field.choices &&
        field.choices.length == 2 &&
        this.isNoLike(field.choices[0]) &&
        this.isYesLike(field.choices[1]))
    );
  }

  _fieldIsRadioGroupType(field) {
    return (
      field.type === "VALUE_IN_LIST" &&
      field.choices &&
      field.choices.length <= 3 &&
      !this._fieldIsCheckboxType(field)
    );
  }

  _fieldIsDropdownMenuType(field) {
    return (
      field.type === "VALUE_IN_LIST" &&
      field.choices &&
      field.choices.length > 3
    );
  }

  _fieldIsDatePickerType(field) {
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

  _fieldIsTextInputType(field) {
    return (
      !this._fieldIsTagIdType(field) &&
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

  _fieldIsTagIdType(field) {
    return field.name === this.usersTagIdColumn;
  }

  _fieldIsImageType(field) {
    return field.type === "TEXT_IS_VALID_URL";
  }

  _userNameChanged(newValue, oldValue) {
    if (newValue) {
      // Search for user by name (if already entered), display in form
      if (this.usersNameColumn && this.userName) {
        this.queryUsers(
          "where " + this.usersNameColumn + " = '" + this.userName + "'"
        ).then(q => {
          q.send(res => {
            var values = this.getFirstRowValuesFromResponse(res);
            if (values && values.length) {
              this.showUser(values);
            }
          });
        });
      }
    }
  }

  connectedCallback() {
    super.connectedCallback();

    // Add callback to update styles on resize
    this._updateGridStyles =
      this._updateGridStyles ||
      (() => {
        this.updateStyles();
      });
    window.addEventListener("resize", this._updateGridStyles);

    /*
    var sheets = this.shadowRoot.getElementById("sheets");
    sheets.onSheetsApiLoaded = function() {
      console.log("onSheetsApiLoaded");
    }
    sheets.onSheetsApiLoadError = function() {
      console.log("onSheetsApiLoadError");
    }
*/
  }

  disconnectedCallback() {
    // Remove callback to update styles on resize
    window.removeEventListener("resize", this._updateGridStyles);
  }

  ready() {
    super.ready();

    var intervalId = setInterval(() => {
      if (gapi) {
        if (gapi.client) {
          var clients = this.shadowRoot.querySelectorAll(
            "google-client-loader"
          );
          for (var i = 0; i < clients.length; i++) {
            console.log("Force loaded gapi.client");
            clients[i]._loadClient();
          }
          clearInterval(intervalId);
        } else {
          console.log("Missing gapi.client");
          gapi.load("client", function() {});
        }
      } else {
        console.log("Missing gapi global");
      }
    }, 1000);

    console.log("initialQuery");
    console.log(this.query);
    if (this.query && "name" in this.query) {
      this.userName = this.query["name"];
      this.queryUsers(
        "where " + this.usersNameColumn + " = '" + this.userName + "'"
      ).then(q => {
        q.send(res => {
          var values = this.getFirstRowValuesFromResponse(res);
          if (values && values.length) {
            this.showUser(values);
          }
        });
      });
    }

    // Search the activity list periodically, update the user form accordingly
    var pollActivityIntervalMillis = 2000;
    var makerLabsIdPrev = "";
    window.setInterval(() => {
      //TODO: not hard-coded
      this.queryActivity(
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
      ).then(q => {
        q.send(res => {
          var items = [];
          var values = this.getValuesFromResponse(res);
          if (values && values.length) {
            for (var rowIdx = 0; rowIdx < values.length; rowIdx++) {
              var makerLabsId = values[rowIdx][0];
              if (makerLabsId != makerLabsIdPrev) {
                this.queryUsers(
                  "where " +
                    this.usersMakerLabsIdColumn +
                    " = '" +
                    makerLabsId +
                    "'"
                ).then(q => {
                  q.send(res => {
                    var values = this.getFirstRowValuesFromResponse(res);
                    if (values && values.length) {
                      this.showUser(values);
                    }
                  });
                });

                makerLabsIdPrev = makerLabsId;
              }
            }
          }
        });
      });
    }, pollActivityIntervalMillis); // repeat forever

    // Search for recently scanned tags, prefill the Tag ID dropdown
    var el = this.shadowRoot.getElementById(this.usersTagIdColumn);
    if (el) {
      this.queryActivity(
        "select " +
          this.activityTagIdColumn +
          ", count(" +
          this.activityTimestampColumn +
          ") group by " +
          this.activityTagIdColumn
      ).then(q => {
        q.send(res => {
          var items = [];
          var values = this.getValuesFromResponse(res);
          if (values && values.length) {
            for (var rowIdx = 0; rowIdx < values.length; rowIdx++) {
              var tagId = values[rowIdx][0];
              items.push({ label: "Recently scanned: " + tagId, value: tagId });
            }

            el.items = items;
          }
        });
      });
    }
  }

  getValuesFromResponse(res) {
    var datatable = res.getDataTable();
    var values = [];
    if (
      datatable &&
      datatable.getNumberOfRows() &&
      datatable.getNumberOfColumns()
    ) {
      for (var rowIdx = 0; rowIdx < datatable.getNumberOfRows(); rowIdx++) {
        var rowValues = [];

        for (
          var colIdx = 0;
          colIdx < datatable.getNumberOfColumns();
          colIdx++
        ) {
          rowValues.push(datatable.getValue(rowIdx, colIdx));
        }

        values.push(rowValues);
      }
    }

    return values;
  }

  getFirstRowValuesFromResponse(res) {
    var values = this.getValuesFromResponse(res);
    return values && values.length && values[0];
  }

  querySheet(sheetName, query, numHeaders = 1) {
    var queryString = encodeURIComponent(query);

    var loader = this.$.gviz;

    return loader.query(
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
        queryString
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

  handleQueryResponse(response) {
    var data = response.getDataTable();
    console.log("handleQueryResponse data");
    console.log(data);
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

        if (!val) {
          // Reset the previous value, if no new value is set.
          val = "";
        }

        if (this._fieldIsCheckboxType(field)) {
          var el = this.shadowRoot.getElementById(field.name);

          el.checked = this.isYesLike(val[0]);
        } else if (this._fieldIsRadioGroupType(field)) {
          var el = this.shadowRoot.getElementById(field.name);

          el.select(val);
        } else if (this._fieldIsDropdownMenuType(field)) {
          var el = this.shadowRoot.getElementById(field.name);
          var listbox = el.querySelector("paper-listbox");
          var selectedIdx = field.choices.indexOf(val);

          listbox.selected = selectedIdx >= 0 ? selectedIdx : 0;
        } else if (
          this._fieldIsDatePickerType(field) ||
          this._fieldIsTextInputType(field)
        ) {
          var el = this.shadowRoot.getElementById(field.name);

          el.value = val;
        } else if (this._fieldIsImageType(field)) {
          var photoUrl = val;
          var img = this.shadowRoot.getElementById(field.name);

          img.src = photoUrl;
        } else {
          console.log(
            "unknown field name " + field.name + ", type " + field.type
          );
        }
      }
    }
  }

  handleSubmit() {
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
          if (this._fieldIsCheckboxType(field)) {
            formValue = el.checked ? field.choices[0] : field.choices[1];
          } else if (this._fieldIsRadioGroupType(field)) {
            formValue = el.selected;
          } else if (this._fieldIsDropdownMenuType(field)) {
            formValue = el.value;
          } else if (
            this._fieldIsDatePickerType(field) ||
            this._fieldIsTextInputType(field)
          ) {
            formValue = el.value;

            // Check whether any non-empty text value was supplied
            if (formValue) {
              validTextFieldCount++;
            }
          } else if (this._fieldIsImageType(field)) {
            console.log("check image el");
            console.log(el);
            // Ignore emptyImageData
            if (el.src != el.emptyImageData) {
              console.log("image el.src = " + el.src);
              formValue = el.src;
            }
          } else {
            console.log("unknown field " + field.name);
          }
        }

        formValues.push(formValue);
      }
    }

    if (sheets && sheets.api && formValues.length) {
      var rowName = formValues[0];

      if (rowName) {
        console.log("update rowName = " + rowName);
        sheets.api.spreadsheets.values
          .update({
            spreadsheetId: this.sheetId,
            range: this.usersSheetName + "!A" + rowName,
            majorDimension: "ROWS",
            valueInputOption: "USER_ENTERED",
            values: [formValues]
          })
          .then(function(response) {
            console.log(response);
          });
      } else {
        console.log(formValues);
        if (validTextFieldCount > 0) {
          console.log("create new user");
          formValues[0] = "=row()";

          sheets.api.spreadsheets.values
            .append({
              spreadsheetId: this.sheetId,
              range: this.usersSheetName,
              valueInputOption: "USER_ENTERED",
              insertDataOption: "INSERT_ROWS",
              values: [formValues]
            })
            .then(function(response) {
              console.log(response);
            });
        }
      }
    }
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
}

customElements.define(ViewUserForm.is, ViewUserForm);
