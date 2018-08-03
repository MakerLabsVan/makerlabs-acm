import {LitElement, html} from "@polymer/lit-element";
import {
  setPassiveTouchGestures,
  setRootPath,
} from "@polymer/polymer/lib/utils/settings";

/* App Layout */
import "@polymer/app-layout/app-header-layout/app-header-layout.js";
import "@polymer/app-layout/app-header/app-header.js";
import "@polymer/app-layout/app-toolbar/app-toolbar.js";

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

  _render(props) {
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
          <google-signin
            openid-prompt="select_account"
            clientId="${props.oauthClientId}"
            scopes="${props.oauthScopes}"
          ></google-signin>
          <div main-title="">
            <span>MakerLabs ACM</span>
          </div>
          <user-search-bar
            id="search"
            class="search-bar"
          ></user-search-bar>
        </app-toolbar>
      </app-header>

      <!-- Render Form -->
      <view-user-form
        id="form"
        sheetId="${props.sheetId}"
        machineId="${props.machineId}"
        accessToken="${props.accessToken}"
        fields="${props._fields}"
        query="${props.query}"
        defaultPhotoUrl="${props.defaultPhotoUrl}"
      ></view-user-form>
    </app-header-layout>
`;
  }

  get fields() {
    return this._fields;
  }

  set fields(fields) {
    this._fieldsChanged(fields, this._fields);
    this._fields = fields;
  }

  async _fieldsChanged(newValue, oldValue) {
    if (newValue) {
      const form = this.shadowRoot.getElementById("form");
      if (form) {
        form.fields = newValue;
        var queryStr;
        if (form.query) {
          if (form.query["Name"]) {
            form.userName = form.query["Name"];
            queryStr = `where ${form.usersNameColumn} = '${form.userName}'`;
          }
          if (form.query["MakerLabs ID"]) {
            const makerLabsId = form.query["MakerLabs ID"];
            queryStr = `where ${
              form.usersMakerLabsIdColumn
            } = '${makerLabsId}'`;
          }

          if (queryStr && queryStr.length) {
            const datatable = await form.queryUsers(queryStr);
            var values = form.getFirstRowValuesFromDatatable(datatable);
            if (values && values.length) {
              form.showUser(values);
            }
          }
        }

        // Select all machines for the top entries in the search bar
        const machinesDatatable = await form.queryActivity(
          "select max(" +
            form.activityMachineIdColumn +
            ") group by " +
            form.activityMachineIdColumn
        );
        const machines = [];

        if (
          machinesDatatable &&
          machinesDatatable.table &&
          machinesDatatable.table.rows &&
          machinesDatatable.table.cols
        ) {
          for (
            var rowIdx = 0;
            rowIdx < machinesDatatable.table.rows.length;
            rowIdx++
          ) {
            const colIdx = 0;
            const v =
              machinesDatatable.table.rows[rowIdx].c[colIdx] &&
              machinesDatatable.table.rows[rowIdx].c[colIdx].v;
            if (v) {
              machines.push({
                type: "machine",
                style: "",
                secondaryStyle: "display: none;",
                imageStyle: "display: none;",
                iconStyle: "",
                Name: v,
              });
            }
          }
        }

        // Select all users and update the search bar
        const usersDatatable = await form.queryUsers(
          `select ${this.usersSearchColumns}`
        );
        // Start with list of machines populated in previous step
        const users = machines.slice();
        const sections = this.fields.map((section) => section.title);

        if (
          usersDatatable &&
          usersDatatable.table &&
          usersDatatable.table.rows &&
          usersDatatable.table.cols
        ) {
          for (
            var rowIdx = 0;
            rowIdx < usersDatatable.table.rows.length;
            rowIdx++
          ) {
            var currentSection = 0;
            const user = {
              type: "user",
              style: "",
              secondaryStyle: "",
              imageStyle: "",
              iconStyle: "display: none;",
            };

            for (
              var colIdx = 0;
              colIdx < usersDatatable.table.cols.length;
              colIdx++
            ) {
              var k = usersDatatable.table.cols[colIdx].label;
              // Strip section heading if it is present
              if (k.indexOf(sections[currentSection]) === 0) {
                k = k.substr(sections[currentSection].length + 1);
                currentSection++;
              }
              // Replace invalid identifier chars with _
              k = k.replace(/\W/g, "_");

              const v =
                usersDatatable.table.rows[rowIdx].c[colIdx] &&
                usersDatatable.table.rows[rowIdx].c[colIdx].v;
              user[k] = v;
            }

            if (!("Photo" in user) || !user.Photo) {
              user.Photo = this.defaultPhotoUrl;
            }

            if (user.Name) {
              users.push(user);
            }
          }
        }

        const userSearchBar = this.shadowRoot.getElementById("search");
        if (userSearchBar) {
          userSearchBar.items = users;
        }
      }
    }
  }

  _firstRendered() {
    // Attach auth callbacks
    const aware = this.shadowRoot.querySelector("google-signin-aware");
    aware.handleAuthSignIn = this.handleAuthSignIn;
    aware.handleAuthSignOut = this.handleAuthSignOut;
    aware.handleAuthStateChange = this.handleAuthStateChange;

    const search = this.shadowRoot.getElementById("search");
    const form = this.shadowRoot.getElementById("form");
    search.addEventListener("search", async (e) => {
      if (e.detail) {
        const item = e.detail;
        switch (item.type) {
          case "user": {
            // Clear existing activity poll loop, if currently running
            if (this.pollActivityIntervalId) {
              clearInterval(this.pollActivityIntervalId);
              this.pollActivityIntervalId = null;
            }

            form.resetValues();

            // Search for this user by row, and display the values
            const row = parseInt(item.Row, 10);
            const datatable = await form.queryUsers(`where A = ${row}`);
            const values = form.getFirstRowValuesFromDatatable(datatable);
            if (values && values.length) {
              form.showUser(values);
            }
            break;
          }
          case "machine": {
            const q = item.Name;

            // Search the activity list periodically, update the user form accordingly
            var pollActivityIntervalMillis = 2000;
            if (this.pollActivityIntervalId) {
              clearInterval(this.pollActivityIntervalId);
              this.pollActivityIntervalId = null;
            }

            form.resetValues();

            this.pollActivityIntervalId = window.setInterval(
              form.updateFormFromMostRecentScan.bind(form),
              pollActivityIntervalMillis
            ); // repeat forever
          }
        }
      }
    });
  }

  populateAccessToken() {
    var accessToken = null;

    const authInstance =
      typeof gapi === "object" && gapi.auth2 && gapi.auth2.getAuthInstance();

    if (authInstance) {
      const currentUser =
        authInstance &&
        authInstance.currentUser &&
        authInstance.currentUser.get();

      if (currentUser) {
        const authResponse = currentUser.getAuthResponse(true);
        if (authResponse) {
          if ("access_token" in authResponse) {
            accessToken = authResponse["access_token"];
          }
        }
      }
    }

    return accessToken;
  }

  async handleAuthSignIn(response) {
    this.accessToken = this.populateAccessToken();

    const intervalId = setInterval(
      () => {
        this.accessToken = this.populateAccessToken();
        console.log(`Updated accessToken`);
      },
      20 * (60 * 1000) // 20min
    );

    if (
      this.fieldsUrl &&
      this.fieldsUrl.length > 0 &&
      this.accessToken &&
      this.accessToken.length > 0
    ) {
      const response = await fetch(this.fieldsUrl, {
        mode: "cors",
        credentials: "omit",
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });
      if (response.status == 200) {
        this.fields = await response.json();
      } else {
        console.log(
          `Fields JSON request fetch failed with response code: ${
            response.status
          }`
        );
      }
    }
  }

  handleAuthSignOut(response) {}

  handleAuthStateChange(response) {}
}

customElements.define("app-shell", AppShell);
