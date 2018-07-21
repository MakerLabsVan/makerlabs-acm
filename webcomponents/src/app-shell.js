import {LitElement, html} from "@polymer/lit-element";
import {
  setPassiveTouchGestures,
  setRootPath,
} from "@polymer/polymer/lib/utils/settings";

/* App Layout */
import "@polymer/app-layout/app-header-layout/app-header-layout.js";
import "@polymer/app-layout/app-header/app-header.js";
import "@polymer/app-layout/app-toolbar/app-toolbar.js";

/* Cross-Domain HTTP Requests */
import "@polymer/iron-ajax/iron-ajax.js";

/* Google Sign-In, Sheets, Charts, ... */
import "google-signin/google-signin.js";
import "google-apis/google-apis.js";

/* Local Components */
import "./user-search-bar.js";
import "./view-user-form.js";

// Gesture events like tap and track generated from touch will not be
// preventable, allowing for better scrolling performance.
setPassiveTouchGestures(true);

// Set Polymer's root path to the same value we passed to our service worker
// in `index.html`.
setRootPath(MyAppGlobals.rootPath);

class AppShell extends LitElement {
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
      oauthClientId: {
        type: String,
      },
      oauthScopes: {
        type: String,
      },
      fieldsUrl: {
        type: String,
      },
      _fields: {
        type: Array,
      },
      fieldsUrl: {
        type: String,
      },
      userName: {
        type: String,
      },
      usersSearchColumns: {
        type: String,
      },
      defaultPhotoUrl: {
        type: String,
      },
      query: {
        type: Object,
      },
    };
  }

  _render({
    fieldsUrl,
    accessToken,
    oauthClientId,
    oauthScopes,
    sheetId,
    machineId,
    _fields: fields,
    query,
  }) {
    return html`
    <style>
      app-toolbar {
        background-color: #1E88E5;
        font-family: "Roboto", Helvetica, sans-serif;
        color: white;
        --app-toolbar-font-size: 24px;
      }
      .search-bar {
        width: 50%;
      }
    </style>

    <app-header-layout>
      <!-- Google Data, APIs, and Auth -->
      <google-signin-aware
        on-google-signin-aware-success="${this.handleAuthSignIn.bind(this)}"
        on-google-signin-aware-signed-out="${this.handleAuthSignOut.bind(this)}"
      ></google-signin-aware>

      <!-- App Layout -->
      <app-header slot="header" fixed="">
        <app-toolbar>
          <google-signin openid-prompt="select_account" clientId="${oauthClientId}" scopes="${oauthScopes}"></google-signin>
          <div main-title="">
            <span>MakerLabs ACM</span>
          </div>
          <user-search-bar id="search" class="search-bar"></user-search-bar>
        </app-toolbar>
      </app-header>

      <!-- Render Form -->
      <view-user-form id="form" sheetId="${sheetId}" machineId="${machineId}" accessToken="${accessToken}" fields="${fields}" query="${query}">
      </view-user-form>
    </app-header-layout>
`;
  }

  static get fetchInitialQuery() {
    // TODO(@paulreimer): From Google Apps Script:
    // JSON.stringify(e.parameters)
    return {};
  }

  get fields() {
    return this._fields;
  }

  set fields(fields) {
    this._fieldsChanged(fields, this.fields);
    this._fields = fields;
  }

  _fieldsChanged(newValue, oldValue) {
    if (newValue) {
      const form = this.shadowRoot.getElementById("form");
      if (form) {
        // Select all users and update the search bar
        form.queryUsers("select " + this.usersSearchColumns).then((q) => {
          q.send((res) => {
            var datatable = res.getDataTable();
            var users = [];
            var sections = newValue.map(function(section) {
              return section.title;
            });

            if (datatable) {
              for (
                var rowIdx = 0;
                rowIdx < datatable.getNumberOfRows();
                rowIdx++
              ) {
                var currentSection = 0;
                var rowValues = {};

                for (
                  var colIdx = 0;
                  colIdx < datatable.getNumberOfColumns();
                  colIdx++
                ) {
                  var k = datatable.getColumnLabel(colIdx);
                  // Strip section heading if it is present
                  if (k.indexOf(sections[currentSection]) == 0) {
                    k = k.substr(sections[currentSection].length + 1);
                    currentSection++;
                  }
                  // Replace invalid identifier chars with _
                  k = k.replace(/\W/g, "_");

                  var v = datatable.getValue(rowIdx, colIdx);
                  rowValues[k] = v;
                }

                if (!("Photo" in rowValues) || !rowValues["Photo"]) {
                  rowValues["Photo"] = this.defaultPhotoUrl;
                }

                if ("Name" in rowValues && rowValues["Name"]) {
                  users.push(rowValues);
                }
              }
            }

            var userSearchBar = this.shadowRoot.getElementById("search");
            if (userSearchBar) {
              userSearchBar.items = users;
            }
          });
        });
      }
    }
  }

  connectedCallback() {
    super.connectedCallback();

    // Attach auth callbacks
    var aware = this.shadowRoot.querySelector("google-signin-aware");
    aware.handleAuthSignIn = this.handleAuthSignIn;
    aware.handleAuthSignOut = this.handleAuthSignOut;
    aware.handleAuthStateChange = this.handleAuthStateChange;
  }

  _firstRendered() {
    var search = this.shadowRoot.getElementById("search");
    search.addEventListener("search", (e) => {
      const form = this.shadowRoot.getElementById("form");
      const q = e.detail.q;
      form.queryUsers("where C = '" + q + "'").then(
        function(q) {
          q.send((res) => {
            var values = this.getFirstRowValuesFromResponse(res);
            if (values && values.length) {
              this.showUser(values);
            }
          });
        }.bind(form)
      );
    });
  }

  populateAccessToken() {
    var accessToken = null;

    var authInstance =
      typeof gapi === "object" && gapi.auth2 && gapi.auth2.getAuthInstance();

    if (authInstance) {
      var currentUser =
        authInstance &&
        authInstance.currentUser &&
        authInstance.currentUser.get();

      if (currentUser) {
        var authResponse = currentUser.getAuthResponse(true);
        if (authResponse) {
          if ("access_token" in authResponse) {
            accessToken = authResponse["access_token"];
          }
        }
      }
    }

    return accessToken;
  }

  handleAuthSignIn(response) {
    console.log("handleAuthSignIn");
    this.accessToken = this.populateAccessToken();

    var intervalId = setInterval(
      () => {
        this.accessToken = this.populateAccessToken();
      },
      20 * (60 * 1000) // 20min
    );

    if (
      this.fieldsUrl &&
      this.fieldsUrl.length > 0 &&
      this.accessToken &&
      this.accessToken.length > 0
    ) {
      fetch(`${this.fieldsUrl}&access_token=${this.accessToken}`).then(
        (response) => {
          if (response.status == 200) {
            response.json().then((fields) => {
              this.fields = fields;
            });
          } else {
            console.log(
              `Fields JSON request fetch failed with response code: ${
                response.status
              }`
            );
          }
        }
      );
    }
  }

  handleAuthSignOut(response) {
    console.log("handleAuthSignOut");
  }

  handleAuthStateChange(response) {
    console.log("handleAuthStateChange");
  }
}

customElements.define("app-shell", AppShell);
