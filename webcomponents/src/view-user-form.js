import { PolymerElement } from '@polymer/polymer/polymer-element.js';

/* Prereqs */
import '@polymer/iron-icons/iron-icons.js';

/* Layout */
import '@polymer/app-layout/app-grid/app-grid-style.js';

/* Material Design Card/Item Components */
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-item/paper-icon-item.js';
import '@polymer/paper-item/paper-item-body.js';
import '@polymer/paper-card/paper-card.js';

/* Material Design Form Components */
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-checkbox/paper-checkbox.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-radio-group/paper-radio-group.js';
import '@polymer/paper-radio-button/paper-radio-button.js';
import '@polymer/paper-fab/paper-fab.js';
import '@polymer/paper-tooltip/paper-tooltip.js';

/* Vaadin Components */
import '@vaadin/vaadin-material-styles/vaadin-date-picker.js';
import '@vaadin/vaadin-material-styles/vaadin-combo-box.js';
import '@vaadin/vaadin-material-styles/vaadin-combo-box-item.js';
import '@vaadin/vaadin-date-picker/vaadin-date-picker-light.js';

/* Google Sign-In, Sheets, Charts, ... */
import 'google-signin/google-signin.js';
import 'google-apis/google-apis.js';
import 'google-chart/google-chart-loader.js';

/* Local Components */
import './image-file-uploader.js';

import { html } from '@polymer/polymer/lib/utils/html-tag.js';

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

    <div class="content-wrapper">
      <form onsubmit="return false;" id="viewUserForm">
        <!-- Google Data, APIs, and Auth -->
        <google-signin-aware on-google-signin-aware-success="handleAuthSignIn" on-google-signin-aware-signed-out="handleAuthSignOut"></google-signin-aware>
        <google-chart-loader></google-chart-loader>

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

  static get is() { return 'view-user-form'; }

  static get properties() {
    return {
      fields: {
        type: Array
      },
      userName: {
        type: String
      },
      query: {
        type: Object
      }
    }
  }

  get sheetId() { return '1Sd3nYY34dllVUsakwU8hLnJQ1m-U50qZwQSxst2SKKg'; }

  get usersSheetGid() { return '653502556'; }
  get usersSheetNumHeaders() { return 2; }

  get activitySheetGid() { return '1547381894'; }
  get activitySheetNumHeaders() { return 1; }

  get sheetName() { return 'Users'; }
  get hiddenSectionNames() { return ['Initial', 'Hidden', 'Private']; }
  get tagIdColumn() { return 'T'; }
  get nameColumn() { return 'C'; }
  get makerLabsIdColumn() { return 'I'; }
  get searchColumns() { return 'A,B,C,D,E,F,G,H,I'; }

  get defaultPhotoUrl() { return 'https://drive.google.com/a/p-rimes.net/uc?id=1nevGbxJUGvdw9MkuF1iBfuoR9cfvss-6&export=download'; }


  get accessToken() {
    var accessToken = null;

    var authInstance = (
      gapi
      && gapi.auth2
      && gapi.auth2.getAuthInstance()
    );

    if (authInstance)
    {
      var currentUser = (
        authInstance
        && authInstance.currentUser
        && authInstance.currentUser.get()
      );

      if (currentUser) {
        var authResponse = currentUser.getAuthResponse(true);
        if (authResponse) {
          if ('access_token' in authResponse) {
            accessToken = authResponse['access_token'];
          }
        }
      }
    }

    return accessToken;
  }

  _sectionIsHidden(section) {
    return (
      section
      && (this.hiddenSectionNames.indexOf(section.title) != -1)
    );
  }

  // https://developers.google.com/apps-script/reference/spreadsheet/data-validation-criteria#properties
  _fieldIsCheckboxType(field) {
    return (
      field.type === 'VALUE_IN_LIST'
      && field.choices.length == 2
      && this.isNoLike(field.choices[0])
      && this.isYesLike(field.choices[1])
    );
  }

  _fieldIsRadioGroupType(field) {
    return (
      field.type === 'VALUE_IN_LIST'
      && field.choices.length <= 3
      && !this._fieldIsCheckboxType(field)
    );
  }

  _fieldIsDropdownMenuType(field) {
    return (
      field.type === 'VALUE_IN_LIST'
      && field.choices.length > 3
    );
  }

  _fieldIsDatePickerType(field) {
    return (
      field.type == 'DATE_AFTER'
      || field.type == 'DATE_BEFORE'
      || field.type == 'DATE_BETWEEN'
      || field.type == 'DATE_EQUAL_TO'
      || field.type == 'DATE_IS_VALID_DATE'
      || field.type == 'DATE_NOT_BETWEEN'
      || field.type == 'DATE_ON_OR_AFTER'
      || field.type == 'DATE_ON_OR_BEFORE'
    );
  }

  _fieldIsTextInputType(field) {
    return (
      !this._fieldIsTagIdType(field)
      && (
        !field.type
        || field.type == 'NUMBER_BETWEEN'
        || field.type == 'NUMBER_EQUAL_TO'
        || field.type == 'NUMBER_GREATER_THAN'
        || field.type == 'NUMBER_GREATER_THAN_OR_EQUAL_TO'
        || field.type == 'NUMBER_LESS_THAN'
        || field.type == 'NUMBER_LESS_THAN_OR_EQUAL_TO'
        || field.type == 'NUMBER_NOT_BETWEEN'
        || field.type == 'NUMBER_NOT_EQUAL_TO'
        || field.type == 'TEXT_CONTAINS'
        || field.type == 'TEXT_DOES_NOT_CONTAIN'
        || field.type == 'TEXT_EQUAL_TO'
        || field.type == 'TEXT_IS_VALID_EMAIL'
      )
    );
  }

  _fieldIsTagIdType(field) {
    return (
      field.name === this.tagIdColumn
    );
  }

  _fieldIsImageType(field) {
    return (
      field.type === 'TEXT_IS_VALID_URL'
    );
  }

  connectedCallback() {
    super.connectedCallback();

    // Add callback to update styles on resize
    this._updateGridStyles = this._updateGridStyles || function() {
      this.updateStyles();
    }.bind(this);
    window.addEventListener('resize', this._updateGridStyles);

    // Attach auth callbacks
    var aware = this.shadowRoot.querySelector('google-signin-aware');
    aware.handleAuthSignIn = this.handleAuthSignIn;
    aware.handleAuthSignOut = this.handleAuthSignOut;
    aware.handleAuthStateChange = this.handleAuthStateChange;
/*
    var sheets = this.shadowRoot.getElementById('sheets');
    sheets.onSheetsApiLoaded = function() {
      console.log("onSheetsApiLoaded");
    }
    sheets.onSheetsApiLoadError = function() {
      console.log("onSheetsApiLoadError");
    }
*/
  }

  ready() {
    super.ready();
    var intervalId = setInterval(
      function() {
        if (gapi.client) {
          var clients = this.querySelectorAll("google-client-loader");
          for (var i = 0; i < clients.length; i++) {
            console.log("Force loaded gapi.client");
            clients[i]._loadClient();
          }
          clearInterval(intervalId);
        }
        else {
          console.log("Missing gapi.client");
          gapi.load('client', function(){});
        }
      }.bind(this),
      2000
    );
    console.log("initialQuery");
    console.log(this.query);
    if (
      this.query
      && "name" in this.query
    ) {
      this.userName = this.query["name"];
      this.queryUsers("where " + this.nameColumn + " = '" + this.userName + "'").then(function(q) {
        q.send(function(res) {
          var values = this.getFirstRowValuesFromResponse(res);
          if (values && values.length) {
            this.showUser(values);
          }
        }.bind(this));
      }.bind(this));
    }
  }

  disconnectedCallback() {
    // Remove callback to update styles on resize
    window.removeEventListener('resize', this._updateGridStyles);
  }

  getValuesFromResponse(res) {
    var datatable = res.getDataTable();
    var values = [];
    if (
      datatable
      && datatable.getNumberOfRows()
      && datatable.getNumberOfColumns()
    )
    {
      for (var rowIdx = 0; rowIdx < datatable.getNumberOfRows(); rowIdx++)
      {
        var rowValues = [];

        for (var colIdx = 0; colIdx < datatable.getNumberOfColumns(); colIdx++)
        {
          rowValues.push(datatable.getValue(rowIdx, colIdx));
        }

        values.push(rowValues);
      }
    }

    return values;
  }

  getFirstRowValuesFromResponse(res) {
    var values = this.getValuesFromResponse(res);
    return (
      values
      && values.length
      && values[0]
    );
  }

  handleAuthSignIn(response) {
    console.log("did get sign in");

    if (this.accessToken) {
      // Search for user by name (if already entered), display in form
      if (this.userName) {
        this.queryUsers("where " + this.nameColumn + " = '" + this.userName + "'").then(function(q) {
          q.send(function(res) {
            var values = this.getFirstRowValuesFromResponse(res);
            if (values && values.length) {
              this.showUser(values);
            }
          }.bind(this));
        }.bind(this));
      }

      // Search the activity list periodically, update the user form accordingly
      var pollActivityIntervalMillis = 5000;
      var makerLabsIdPrev = "";
      window.setInterval(function () {
        //TODO: not hard-coded
        this.queryActivity("select B where D = 'Signed_In' and A = 'Laser Lab 101' order by E desc limit 1").then(function(q) {
          q.send(function(res) {
            var items = [];
            var values = this.getValuesFromResponse(res);
            if (values && values.length) {
              for (var rowIdx = 0; rowIdx < values.length; rowIdx++) {
                var makerLabsId = values[rowIdx][0];
//                    items.push({label: 'Recently scanned: ' + tagId, value: tagId});
                if (makerLabsId != makerLabsIdPrev) {
                  console.log("Now query for makerLabsId = " + makerLabsId);

                  this.queryUsers("where " + this.makerLabsIdColumn + " = '" + makerLabsId + "'").then(function(q) {
                    q.send(function(res) {
                  console.log("did find user");
                      var values = this.getFirstRowValuesFromResponse(res);
                      if (values && values.length) {
                        this.showUser(values);
                      }
                    }.bind(this));
                  }.bind(this));

                  makerLabsIdPrev = makerLabsId;
                }
              }
            }
          }.bind(this));
        }.bind(this));
      }.bind(this), pollActivityIntervalMillis); // repeat forever

      // Search for recently scanned tags, prefill the Tag ID dropdown
      var el = this.shadowRoot.getElementById(this.tagIdColumn);
      if (el) {
        this.queryActivity("select C,count(E) group by " + this.tagIdColumn).then(function(q) {
          q.send(function(res) {
            var items = [];
            var values = this.getValuesFromResponse(res);
            if (values && values.length) {
              for (var rowIdx = 0; rowIdx < values.length; rowIdx++) {
                var tagId = values[rowIdx][0];
                items.push({label: 'Recently scanned: ' + tagId, value: tagId});
              }

              el.items = items;
            }
          }.bind(this));
        }.bind(this));
      }

      // Select all users and update the search bar
      this.queryUsers("select " + this.searchColumns).then(function(q) {
        q.send(function(res) {
          var datatable = res.getDataTable();
          var users = [];
          var sections = this.fields.map(function(section) { return section.title; });

          if (datatable)
          {
            for (var rowIdx = 0; rowIdx < datatable.getNumberOfRows(); rowIdx++)
            {
              var currentSection = 0;
              var rowValues = {};

              for (var colIdx = 0; colIdx < datatable.getNumberOfColumns(); colIdx++)
              {
                var k = datatable.getColumnLabel(colIdx);
                // Strip section heading if it is present
                if (k.indexOf(sections[currentSection]) == 0)
                {
                  k = k.substr(sections[currentSection].length + 1);
                  currentSection++;
                }
                // Replace invalid identifier chars with _
                k = k.replace(/\W/g, '_');

                var v = datatable.getValue(rowIdx, colIdx);
                rowValues[k] = v;
              }

              if (!('Photo' in rowValues) || !(rowValues['Photo']))
              {
                rowValues['Photo'] = this.defaultPhotoUrl;
              }

              if ('Name' in rowValues && rowValues['Name'])
              {
                users.push(rowValues);
              }
            }
          }

          var userSearchBar = document.querySelector('user-search-bar');
          if (userSearchBar) {
            userSearchBar.items = users;
          }
        }.bind(this));
      }.bind(this));
    }
  }

  handleAuthSignOut(response) {
    console.log("did get sign out");
  }

  querySheet(sheetGid, query, numHeaders = 1) {
    var queryString = encodeURIComponent(query);

    var loader = this.shadowRoot.querySelector('google-chart-loader');

    return loader.query(
      'https://docs.google.com/spreadsheets/d/'
      + this.sheetId
      + '/gviz/tq'
      + '?gid=' + sheetGid
      + '&access_token=' + this.accessToken
      + '&headers=' + numHeaders
      + '&tq=' + queryString
    );
  }

  queryUsers(query) {
    return this.querySheet(
      this.usersSheetGid,
      query,
      this.usersSheetNumHeaders
    );
  }

  queryActivity(query) {
    return this.querySheet(
      this.activitySheetGid,
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
        var val = (i < data.length)? data[i++] : null;
        var field = section.fields[f];

        if (!val)
        {
          // Reset the previous value, if no new value is set.
          val = "";
        }

        if (this._fieldIsCheckboxType(field))
        {
          var el = this.shadowRoot.getElementById(field.name);

          el.checked = (this.isYesLike(val[0]));
        }

        else if (this._fieldIsRadioGroupType(field))
        {
          var el = this.shadowRoot.getElementById(field.name);

          el.select(val);
        }

        else if (this._fieldIsDropdownMenuType(field))
        {
          var el = this.shadowRoot.getElementById(field.name);
          var listbox = el.querySelector('paper-listbox');
          var selectedIdx = field.choices.indexOf(val);

          listbox.selected = (selectedIdx >= 0? selectedIdx : 0);
        }

        else if (
          this._fieldIsDatePickerType(field)
          || this._fieldIsTextInputType(field)
        )
        {
          var el = this.shadowRoot.getElementById(field.name);

          el.value = val;
        }

        else if (this._fieldIsImageType(field))
        {
          var photoUrl = val;
          var img = this.shadowRoot.getElementById(field.name);

          img.src = photoUrl;
        }

        else {
          console.log("unknown field name " + field.name);
        }
      }
    }
  }

  handleSubmit() {
    var sheets = document.getElementById('sheets');

    var validTextFieldCount = 0;
    var formValues = [];
    for (var s = 0; s < this.fields.length; ++s) {
      var section = this.fields[s];

      for (var f = 0; f < section.fields.length; ++f) {
        var formValue;
        var field = section.fields[f];

        var el = this.shadowRoot.getElementById(field.name);
        if (el)
        {
          if (this._fieldIsCheckboxType(field))
          {
            formValue = (el.checked? field.choices[1] : field.choices[0]);
          }

          else if (this._fieldIsRadioGroupType(field))
          {
            formValue = el.selected;
          }

          else if (this._fieldIsDropdownMenuType(field))
          {
            formValue = el.value;
          }

          else if (
            this._fieldIsDatePickerType(field)
            || this._fieldIsTextInputType(field)
          )
          {
            formValue = el.value;

            // Check whether any non-empty text value was supplied
            if (formValue) {
              validTextFieldCount++
            }
          }

          else if (this._fieldIsImageType(field))
          {
            console.log("check image el");
            console.log(el);
            // Ignore emptyImageData
            if (el.src != el.emptyImageData)
            {
              console.log("image el.src = " + el.src);
              formValue = el.src;
            }
          }

          else {
            console.log("unknown field " + field.name);
          }
        }

        formValues.push(formValue);
      }
    }

    if (
      sheets
      && sheets.api
      && formValues.length
    ) {
      var rowName = formValues[0];

      if (rowName) {
        console.log("update rowName = " + rowName);
        sheets.api.spreadsheets.values.update({
          spreadsheetId: this.sheetId,
          range: this.sheetName + '!A' + rowName,
          majorDimension: "ROWS",
          valueInputOption: 'USER_ENTERED',
          values: [formValues]
        }).then(function(response) {
           console.log(response);
        });
      }
      else {
        console.log(formValues);
        if (validTextFieldCount > 0) {
          console.log("create new user");
          formValues[0] = "=row()";

          sheets.api.spreadsheets.values.append({
            spreadsheetId: this.sheetId,
            range: this.sheetName,
            valueInputOption: 'USER_ENTERED',
            insertDataOption: 'INSERT_ROWS',
            values: [formValues]
          }).then(function(response) {
             console.log(response);
          });
        }
      }
    }
  }

  isYesLike(s) {
    var yesLike = ["☑","Y","y","T","t","Yes","yes","True","true"];
    return (yesLike.indexOf(s) != -1);
  }

  isNoLike(s) {
    var noLike = ["☐","N","n","F","f","No","no","False","false"];
    return (noLike.indexOf(s) != -1);
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
