define(["../node_modules/@polymer/lit-element/lit-element.js", "../node_modules/@polymer/polymer/lib/utils/settings.js", "../node_modules/@polymer/app-layout/app-header-layout/app-header-layout.js", "../node_modules/@polymer/app-layout/app-drawer-layout/app-drawer-layout.js", "../node_modules/@polymer/app-layout/app-drawer/app-drawer.js", "../node_modules/@polymer/app-layout/app-header/app-header.js", "../node_modules/@polymer/app-layout/app-toolbar/app-toolbar.js", "../node_modules/google-apis/google-apis.js", "../node_modules/@polymer/paper-button/paper-button.js", "../node_modules/@polymer/paper-dialog/paper-dialog.js", "../node_modules/@polymer/paper-icon-button/paper-icon-button.js", "../node_modules/@polymer/paper-item/paper-icon-item.js", "../node_modules/@polymer/paper-item/paper-item.js", "../node_modules/@polymer/paper-item/paper-item-body.js", "../node_modules/@polymer/paper-spinner/paper-spinner-lite.js", "./user-search-bar.js", "./view-user-form.js", "./google-signin-button.js"], function (_litElement, _settings, _appHeaderLayout, _appDrawerLayout, _appDrawer, _appHeader, _appToolbar, _googleApis, _paperButton, _paperDialog, _paperIconButton, _paperIconItem, _paperItem, _paperItemBody, _paperSpinnerLite, _userSearchBar, _viewUserForm, _googleSigninButton) {
  "use strict";

  // App Layout
  // Google Sign-In, Sheets, Charts, ...
  // Material Design Components
  // Local Components
  // Gesture events like tap and track generated from touch will not be
  // preventable, allowing for better scrolling performance.
  (0, _settings.setPassiveTouchGestures)(true); // Set Polymer's root path to the same value we passed to our service worker
  // in `index.html`.

  (0, _settings.setRootPath)(AppGlobals.rootPath);

  class AppShell extends _litElement.LitElement {
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
        idToken: {
          type: String
        },
        oauthClientId: {
          type: String
        },
        oauthScopes: {
          type: String
        },
        fieldsUrl: {
          type: String
        },
        nextMakerLabsIdUrl: {
          type: String
        },
        fields: {
          type: Array
        },
        userName: {
          type: String
        },
        usersSearchColumns: {
          type: String
        },
        defaultPhotoUrl: {
          type: String
        },
        profilePhotosFolderId: {
          type: String
        },
        query: {
          type: Object
        },
        emptyImageData: {
          type: String
        },
        dialogMetadata: {
          type: Object
        }
      };
    }

    constructor() {
      super();
      this.emptyImageData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=";
      this.fields = [];
      this.dialogMetadata = {};
      this.accessToken = "";
    }

    render() {
      return _litElement.html`
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
      .overlay {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .avatar {
        display: inline-block;
        box-sizing: border-box;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: var(--paper-grey-600);
      }
      .listbox-button,
      .listbox-button google-signin-button {
        width: 95%;
      }
    </style>

    <!-- App Layout -->
    <app-drawer-layout fullbleed force-narrow>
      <app-drawer slot="drawer" id="drawer">
        <div role="listbox">
          ${this.currentUser ? _litElement.html`
            <paper-icon-item>
              <img
                class="avatar"
                slot="item-icon"
                src="${this.currentUser.photoURL}"
              />
              <paper-item-body two-line>
                <div>${this.currentUser.displayName}</div>
                <div secondary>${this.currentUser.email}</div>
              </paper-item-body>
            </paper-icon-item>
          ` : _litElement.html``}
          <hr />
          <div class="listbox-button">
            <google-signin-button
              id="auth"
              .oauthClientId="${this.oauthClientId}"
              .oauthScopes="${this.oauthScopes}"
              @auth-error="${e => this.displayDialog(e.detail)}"
            ></google-signin-button>
          </div>
        </div>
      </app-drawer>
      <app-header-layout fullbleed>
        <app-header slot="header" fixed>
          <app-toolbar>
            <paper-icon-button
              icon="account-box"
              drawer-toggle
            ></paper-icon-button>
            <div main-title>MakerLabs ACM</div>
            <user-search-bar
              id="search"
              class="search-bar"
            ></user-search-bar>
          </app-toolbar>
        </app-header>

        <!-- User Form -->
        ${this.fields && this.fields.length > 0 ? "" : _litElement.html`
            <div class="overlay">
              <paper-spinner-lite active></paper-spinner-lite>
            </div>
          `}
        <view-user-form
          id="form"
          .sheetId=${this.sheetId}
          .machineId=${this.machineId}
          .accessToken=${this.accessToken}
          .query=${this.query}
          .defaultPhotoUrl=${this.defaultPhotoUrl}
          .nextMakerLabsIdUrl=${this.nextMakerLabsIdUrl}
          .profilePhotosFolderId=${this.profilePhotosFolderId}
        ></view-user-form>

      </app-header-layout>
    </app-drawer-layout>

    <!-- Error Dialog (hidden until opened) -->
    <paper-dialog id="dialog" with-backdrop>
      <h2>${this.dialogMetadata.title}</h2>
      <p>${this.dialogMetadata.helpText}</p>
      <p>Internal Error: <i>"${this.dialogMetadata.errorText}"</i></p>
      <div class="buttons">
        <paper-button dialog-confirm autofocus>OK</paper-button>
      </div>
    </paper-dialog>

`;
    }

    async updated(changedProperties) {
      if (changedProperties && changedProperties.has("fields") && this.fields && this.fields.length > 0) {
        const form = this.shadowRoot.getElementById("form");

        if (form) {
          form.fields = this.fields;
          var queryStr;

          if (form.query) {
            if (form.query["Name"]) {
              form.userName = form.query["Name"];
              queryStr = `where ${form.usersNameColumn} = '${form.userName}'`;
            }

            if (form.query["MakerLabs ID"]) {
              const makerLabsId = form.query["MakerLabs ID"];
              queryStr = `where ${form.usersMakerLabsIdColumn} = '${makerLabsId}'`;
            }

            if (queryStr && queryStr.length) {
              const datatable = await form.queryUsers(queryStr);
              var values = form.getFirstRowValuesFromDatatable(datatable);

              if (values && values.length) {
                form.showUserRow(values);
              }
            }
          } // Select all machines for the top entries in the search bar


          const machinesDatatable = await form.queryActivity("select max(" + form.activityMachineIdColumn + ") group by " + form.activityMachineIdColumn);
          const machines = [];

          if (machinesDatatable && machinesDatatable.table && machinesDatatable.table.rows && machinesDatatable.table.cols) {
            for (var rowIdx = 0; rowIdx < machinesDatatable.table.rows.length; rowIdx++) {
              const colIdx = 0;
              const v = machinesDatatable.table.rows[rowIdx].c[colIdx] && machinesDatatable.table.rows[rowIdx].c[colIdx].v;

              if (v) {
                machines.push({
                  type: "machine",
                  style: "",
                  secondaryStyle: "display: none;",
                  imageStyle: "display: none;",
                  iconStyle: "",
                  Name: v,
                  Photo: this.emptyImageData
                });
              }
            }
          } // Select all users and update the search bar


          const usersDatatable = await form.queryUsers(`select ${this.usersSearchColumns}`); // Start with list of machines populated in previous step

          const users = machines.slice();
          const sections = this.fields.map(section => section.title);

          if (usersDatatable && usersDatatable.table && usersDatatable.table.rows && usersDatatable.table.cols) {
            for (var rowIdx = 0; rowIdx < usersDatatable.table.rows.length; rowIdx++) {
              var currentSection = 0;
              const user = {
                type: "user",
                style: "",
                secondaryStyle: "",
                imageStyle: "",
                iconStyle: "display: none;"
              };

              for (var colIdx = 0; colIdx < usersDatatable.table.cols.length; colIdx++) {
                var k = usersDatatable.table.cols[colIdx].label; // Strip section heading if it is present

                if (k.indexOf(sections[currentSection]) === 0) {
                  k = k.substr(sections[currentSection].length + 1);
                  currentSection++;
                } // Replace invalid identifier chars with _


                k = k.replace(/\W/g, "_");
                const v = usersDatatable.table.rows[rowIdx].c[colIdx] && usersDatatable.table.rows[rowIdx].c[colIdx].v;
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

          const search = this.shadowRoot.getElementById("search");

          if (search) {
            search.items = users;
          }
        }
      }
    }

    firstUpdated(changedProperties) {
      const database = firebase.database();
      const auth = this.shadowRoot.getElementById("auth");
      auth.addEventListener("currentUser", async e => {
        if (e.detail) {
          this.handleAuthSignIn();
        } else {
          this.handleAuthSignOut();
        }
      });
      const form = this.shadowRoot.getElementById("form");
      const search = this.shadowRoot.getElementById("search");
      form.addEventListener("reset-form", async e => {
        search.resetSelectedItem();
      });
      form.addEventListener("updated-user", async e => {
        if (e.detail) {
          const user = e.detail;

          if (search) {
            search.mergeItem({
              type: "user",
              style: "",
              secondaryStyle: "",
              imageStyle: "",
              iconStyle: "display: none;",
              Row: user.Row,
              Name: user.Name,
              Email: user.Email,
              MakerLabs_ID: user["MakerLabs ID"],
              Photo: user.Photo
            });
          }
        }
      });
      search.addEventListener("search", async e => {
        if (e.detail) {
          const item = e.detail;

          switch (item.type) {
            case "user":
              {
                // Clear existing activity poll loop, if currently running
                if (this.onActivityCallback) {
                  const latestUserRef = database.ref(`readers/${this.machineId}/latestUser`);
                  latestUserRef.off("value", this.onActivityCallback);
                  this.onActivityCallback = null;
                }

                form.resetValues(); // Search for this user by row, and display the values

                const row = parseInt(item.Row, 10);
                const datatable = await form.queryUsers(`where A = ${row}`);
                const values = form.getFirstRowValuesFromDatatable(datatable);

                if (values && values.length) {
                  form.showUserRow(values);
                }

                break;
              }

            case "machine":
              {
                this.machineId = item.Name; // Search the activity list periodically, update the user form accordingly

                const latestUserRef = database.ref(`readers/${this.machineId}/latestUser`);
                var pollActivityIntervalMillis = 2000;

                if (this.pollActivityIntervalId) {
                  latestUserRef.off("value", this.onActivityCallback);
                  this.onActivityCallback = null;
                }

                form.resetValues(); // Subscribe to activity events

                this.onActivityCallback = latestUserRef.on("value", function (data) {
                  const form = this.shadowRoot.getElementById("form");
                  const user = data.toJSON();

                  if (form && user) {
                    const makerLabsId = user.makerlabsId; // Clear form and update with Firebase values immediately

                    form.resetValues();
                    form.showUserObj(user); // Fetch full user row to update all form fields

                    form.updateFormFromMakerLabsId(makerLabsId);
                  }
                }.bind(this));
              }
          }
        }
      });
    }

    displayDialog(dialogMetadata) {
      this.dialogMetadata = dialogMetadata;
      const dialog = this.shadowRoot.getElementById("dialog");

      if (dialog) {
        dialog.open();
      }
    }

    populateAuthTokens() {
      const authInstance = typeof gapi === "object" && gapi.auth2 && gapi.auth2.getAuthInstance();

      if (authInstance) {
        const currentUser = authInstance && authInstance.currentUser && authInstance.currentUser.get();

        if (currentUser) {
          const authResponse = currentUser.getAuthResponse(true);

          if (authResponse) {
            if ("access_token" in authResponse) {
              this.accessToken = authResponse["access_token"];
            } else {
              console.log("Could not find access_token in Google Sign-In response");
            }

            if ("id_token" in authResponse) {
              this.idToken = authResponse["id_token"];
              this.loginFirebase();
            } else {
              console.log("Could not find id_token in Google Sign-In response");
            }
          }
        }
      }
    }

    async fetchUserFields() {
      if (this.fieldsUrl && this.fieldsUrl.length > 0 && this.accessToken && this.accessToken.length > 0) {
        const response = await fetch(this.fieldsUrl, {
          mode: "cors",
          credentials: "omit",
          headers: {
            Authorization: `Bearer ${this.accessToken}`
          }
        });

        if (response.status == 200) {
          this.fields = await response.json();
        } else {
          console.log(`Fields JSON request fetch failed with response code: ${response.status}`);
        }
      }
    }

    loginFirebase() {
      // Build Firebase credential with the Google ID token.
      const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
      var credential = googleAuthProvider.credential(this.idToken); // Sign in with credential from the Google user.

      firebase.auth().signInAndRetrieveDataWithCredential(credential).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message; // The email of the user's account used.

        var email = error.email; // The firebase.auth.AuthCredential type that was used.

        var credential = error.credential;

        if (errorCode === "auth/account-exists-with-different-credential") {
          console.log("You have already signed up with a different auth provider for that email."); // If you are using multiple auth providers on your app you should handle linking
          // the user's accounts here.
        } else {
          console.error(error);
        }
      });
    }

    handleFirebaseAuthStateChange(user) {
      this.currentUser = user;
    }

    async handleAuthSignIn() {
      this.populateAuthTokens();
      const intervalId = setInterval(() => {
        this.populateAuthTokens();
        console.log(`Updated accessToken`);
      }, 20 * (60 * 1000) // 20min
      );
      this.fetchUserFields();
      firebase.auth().onAuthStateChanged(this.handleFirebaseAuthStateChange.bind(this));
    }

    handleAuthSignOut() {
      this.currentUser = null;
      firebase.auth().signOut();
    }

  }

  customElements.define("app-shell", AppShell);
});