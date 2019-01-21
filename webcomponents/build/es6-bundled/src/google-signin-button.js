define(["../node_modules/@polymer/lit-element/lit-element.js", "../node_modules/@polymer/paper-button/paper-button.js", "../node_modules/@polymer/paper-icon-button/paper-icon-button.js"], function (_litElement, _paperButton, _paperIconButton) {
  "use strict";

  // Material Design Components
  var _gapiLoaded = false;

  class GoogleSigninButton extends _litElement.LitElement {
    static get properties() {
      return {
        signedIn: {
          type: Boolean
        },
        oauthClientId: {
          type: String
        },
        oauthScopes: {
          type: String
        },
        googleAuthInitialized: {
          type: Boolean
        }
      };
    }

    static async loadGapi() {
      if (!_gapiLoaded) {
        const script = document.createElement("script");
        script.src = "https://apis.google.com/js/api:client.js?onload=__gapiCallback";
        script.setAttribute("async", "");
        document.head.appendChild(script);
        _gapiLoaded = true;
      } // Wait for gapi client library to be loaded


      const gapiLoadedPromise = new Promise(resolve => window.__gapiCallback = resolve);
      await gapiLoadedPromise;
    }

    constructor() {
      super();
      this.signedIn = false;
      this.googleAuthInitialized = false;
    }

    render() {
      return this.signedIn ? _litElement.html`
      <paper-button raised style="width: 100%"
        id="logout"
        @tap=${this.handleLogout.bind(this)}
      >Logout</paper-button>
      ` : _litElement.html`
      <paper-button raised style="width: 100%"
        id="login"
        @tap=${this.handleLogin.bind(this)}
        ?disabled=${!this.googleAuthInitialized}
      >Login</paper-button>
      `;
    }

    get cookieWarningDialogMetadata() {
      return {
        title: "3rd-party Cookies Must Be Enabled",
        helpText: "Please enable 3rd-party cookies in your browser. The only such domain used is https://accounts.google.com in order to connect to Google accounts and services."
      };
    }

    async updated(changedProperties) {
      if (!this.googleAuthInitialized && this.oauthClientId && this.oauthScopes) {
        await GoogleSigninButton.loadGapi();
        const googleAuthInitializedPromise = new Promise((resolve, reject) => {
          gapi.client.init({
            clientId: this.oauthClientId,
            scope: this.oauthScopes
          }).then(() => {
            resolve(true);
          }, error => {
            resolve(false); // Emit event with details of error

            this.dispatchEvent(new CustomEvent("auth-error", {
              detail: { ...this.cookieWarningDialogMetadata,
                errorText: error.details
              }
            }));
          });
        });
        this.googleAuthInitialized = await googleAuthInitializedPromise;
        const googleAuth = gapi.auth2.getAuthInstance();

        if (googleAuth) {
          googleAuth.isSignedIn.listen(this.handleAuthStateChanged.bind(this));
          const signedIn = googleAuth.isSignedIn.get();
          this.handleAuthStateChanged(signedIn);
        } else {
          console.log("could not getAuthInstance");
        }
      } else {
        console.log("gapi not loaded");
      }
    }

    async handleLogin() {
      if (!gapi) {
        await GoogleSigninButton.loadGapi();
      }

      const googleAuth = gapi.auth2.getAuthInstance();

      if (googleAuth) {
        await googleAuth.signIn({
          prompt: "select_account"
        });
      } else {
        console.log("could not getAuthInstance");
      }
    }

    async handleLogout() {
      const googleAuth = gapi.auth2.getAuthInstance();
      await googleAuth.signOut();
    }

    async handleAuthStateChanged(signedIn) {
      this.signedIn = signedIn;
      var currentUser = null;

      if (gapi && gapi.auth2) {
        const googleAuth = gapi.auth2.getAuthInstance();
        const includeAccessToken = true;
        const googleUser = googleAuth.currentUser.get();
        const authResponse = googleUser.getAuthResponse(true);

        if (authResponse && "access_token" in authResponse) {
          const basicProfile = googleUser.getBasicProfile();
          currentUser = {
            accessToken: authResponse.access_token,
            name: basicProfile.getName(),
            email: basicProfile.getEmail(),
            photo: basicProfile.getImageUrl()
          };
        }
      } else {
        console.log("gapi/auth2 library not loaded");
      }

      this.dispatchEvent(new CustomEvent("currentUser", {
        detail: currentUser
      }));
    }

  }

  customElements.define("google-signin-button", GoogleSigninButton);
});