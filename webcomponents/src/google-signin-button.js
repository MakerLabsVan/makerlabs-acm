/// @addtogroup webcomponents
/// @{
/// @file
/// @brief Define WebComponent: GoogleSigninButton, register it as
/// <google-signin-button />
import {LitElement, html} from "lit-element";

// Material Design Components
import "@polymer/paper-button/paper-button.js";
import "@polymer/paper-icon-button/paper-icon-button.js";

var _gapiLoaded = false;

/// @brief WebComponent which shows a sign-in / sign-out button and triggers a
/// Google Auth popup flow.
///
/// Emits `auth-error` event if Google Auth API cannot be initialized.<br>
/// Emits `currentUser` event with details of current user (name, email, photo).
class GoogleSigninButton extends LitElement {
  /// @brief WebComponent properties that can be used as HTML attributes.
  ///
  /// @param signedIn
  /// Boolean to set whether a valid Google Auth user has been logged in
  ///
  /// @param oauthClientId
  /// OAuth Application Client ID
  ///
  /// @param oauthScopes
  /// Space-separated list of OAuth scopes / permissions to be requested
  ///
  /// @param googleAuthInitialized
  /// Boolean to set whether Google Auth library has been loaded
  static get properties() {
    return {
      signedIn: {
        type: Boolean,
      },
      oauthClientId: {
        type: String,
      },
      oauthScopes: {
        type: String,
      },
      googleAuthInitialized: {
        type: Boolean,
      },
    };
  }

  /// @brief Create a dynamic <script /> element to load Google `gapi` client
  /// library and wait for it to be loaded.
  static async loadGapi() {
    if (!_gapiLoaded) {
      const script = document.createElement("script");
      script.src =
        "https://apis.google.com/js/api:client.js?onload=__gapiCallback";
      script.setAttribute("async", "");
      document.head.appendChild(script);

      _gapiLoaded = true;
    }

    // Wait for gapi client library to be loaded
    const gapiLoadedPromise = new Promise(
      (resolve) => (window.__gapiCallback = resolve)
    );
    await gapiLoadedPromise;
  }

  constructor() {
    super();
    this.signedIn = false;
    this.googleAuthInitialized = false;
  }

  /// @brief LitElement lifecycle hook. Re-rendered after any update().
  /// @returns LitElement `html``` literal, containing desired DOM state.
  render() {
    return this.signedIn
      ? html`
      <paper-button raised style="width: 100%"
        id="logout"
        @tap=${this.handleLogout.bind(this)}
      >Logout</paper-button>
      `
      : html`
      <paper-button raised style="width: 100%"
        id="login"
        @tap=${this.handleLogin.bind(this)}
        ?disabled=${!this.googleAuthInitialized}
      >Login</paper-button>
      `;
  }

  /// @brief Returns details to be shown in a dialog to the user regarding
  /// enabling 3rd-party cookies support for `accounts.google.com`.
  ///
  /// @return Object describing the `title` and `helpText` of the dialog.
  get cookieWarningDialogMetadata() {
    return {
      title: "3rd-party Cookies Must Be Enabled",
      helpText:
        "Please enable 3rd-party cookies in your browser. The only such domain used is https://accounts.google.com in order to connect to Google accounts and services.",
    };
  }

  /// @brief LitElement lifecycle hook. Called whenever the element's DOM has
  /// been updated and rendered.
  ///
  /// @param changedProperties
  /// JS Map containing properties which have changed
  async updated(changedProperties) {
    if (!this.googleAuthInitialized && this.oauthClientId && this.oauthScopes) {
      /// If Google Auth API has not been initialized, and OAuth client app
      /// settings are present:
      /// - Attempt to load the API.
      await GoogleSigninButton.loadGapi();

      /// - Initialize with OAuth client app details (and scopes).
      const googleAuthInitializedPromise = new Promise((resolve, reject) => {
        gapi.client
          .init({
            clientId: this.oauthClientId,
            scope: this.oauthScopes,
          })
          .then(
            () => {
              resolve(true);
            },
            (error) => {
              resolve(false);

              /// - (Dispatch `auth-error` event with details in case of error).
              this.dispatchEvent(
                new CustomEvent("auth-error", {
                  detail: {
                    ...this.cookieWarningDialogMetadata,
                    errorText: error.details,
                  },
                })
              );
            }
          );
      });
      this.googleAuthInitialized = await googleAuthInitializedPromise;

      const googleAuth = gapi.auth2.getAuthInstance();
      if (googleAuth) {
        /// - If Google Auth API initialization was successful, trigger reload
        /// current login state.
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

  /// @brief Trigger a Google Auth popup.
  async handleLogin() {
    if (!gapi) {
      await GoogleSigninButton.loadGapi();
    }

    const googleAuth = gapi.auth2.getAuthInstance();
    if (googleAuth) {
      await googleAuth.signIn({prompt: "select_account"});
    } else {
      console.log("could not getAuthInstance");
    }
  }

  /// @brief Trigger Google Auth sign-out.
  async handleLogout() {
    const googleAuth = gapi.auth2.getAuthInstance();
    await googleAuth.signOut();
  }

  /// @brief Extract user details (name, email, photo) from logged-in user.
  ///
  /// @param signedIn Boolean to describe whether user is currently signed-in
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
          photo: basicProfile.getImageUrl(),
        };
      }
    } else {
      console.log("gapi/auth2 library not loaded");
    }

    /// Dispatch `currentUser` event with extracted user details.
    this.dispatchEvent(new CustomEvent("currentUser", {detail: currentUser}));
  }
}
customElements.define("google-signin-button", GoogleSigninButton);
/// @}
