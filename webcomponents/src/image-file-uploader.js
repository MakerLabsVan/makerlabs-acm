/// @addtogroup webcomponents
/// @{
/// @file
/// @brief Define WebComponent: ImageFileUploader, register it as
/// <image-file-uploader />
import {LitElement, html} from "lit-element";

/// @brief WebComponent which displays an image, and also supports uploading a
/// new image to Google Drive via drag n' drop, or a file picker window.
class ImageFileUploader extends LitElement {
  /// @brief WebComponent properties that can be used as HTML attributes.
  ///
  /// @param src
  /// Array of User/Machine info for searching and displaying a popup window
  ///
  /// @param name
  /// Array of User/Machine info for searching and displaying a popup window
  ///
  /// @param emptyImageData
  /// Default image data to display if no image data is provided (a blank PNG)
  ///
  /// @param parentFolderId
  /// Google Drive Folder ID to be used as the parent for uploaded images
  /// (defaults to "root")
  static get properties() {
    return {
      src: {
        type: String,
      },
      name: {
        type: String,
      },
      emptyImageData: {
        type: String,
      },
      parentFolderId: {
        type: String,
      },
    };
  }

  constructor() {
    super();
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDragLeave = this.handleDragLeave.bind(this);
    this.handleDraggedFileUpload = this.handleDraggedFileUpload.bind(this);
    this.handleSelectedFileUpload = this.handleSelectedFileUpload.bind(this);

    this.emptyImageData =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=";
    this.src = this.emptyImageData;
    this.parentFolderId = "root";
  }

  /// @brief LitElement lifecycle hook. Re-rendered after any update().
  /// @returns LitElement `html``` literal, containing desired DOM state.
  render() {
    return html`
      <style>
        div#drop_zone {
          height: 250px;
          border: 0px dashed #bbb;
          -moz-border-radius: 5px;
          -webkit-border-radius: 5px;
          border-radius: 5px;
          padding: 25px;
          margin-bottom: 8px;
          text-align: center;
          font: 20pt bold "Helvetica";
          color: #bbb;
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
        }
        span#drop_hint {
          display: none;
        }
        input[type="file"] {
          display: none;
        }
      </style>
      <label for="file-upload">
        <div id="drop_zone" style="background-image: url(${this.src});">
          <span id="drop_hint">Drop files here</span>
          <input id="file-upload" type="file" accept="image/*" />
        </div>
      </label>
    `;
  }

  /// @brief LitElement lifecycle hook. Called after the element's DOM has been
  /// updated the first time, immediately before updated() is called.
  ///
  /// @param changedProperties
  /// JS Map containing properties which have changed
  firstUpdated(changedProperties) {
    /// Setup event listeners:
    const el = this.shadowRoot.getElementById("drop_zone");
    /// - On `dragover`, draw a border around the drop zone.
    el.addEventListener("dragover", this.handleDragOver, false);
    /// - On `dragleave`, cancel the border when no longer dragged over.
    el.addEventListener("dragleave", this.handleDragLeave, false);
    /// - On `drop`, begin the file upload immediately.
    el.addEventListener("drop", this.handleDraggedFileUpload, false);
    /// - On `change`, begin the file upload after selecting a file with the
    /// chooser dialog
    el.addEventListener("change", this.handleSelectedFileUpload, false);
  }

  /// @brief Check if Google Auth user is currently logged-in, and extract the
  /// OAuth `accessToken` for Google Drive access.
  ///
  /// @return OAuth `accessToken`
  get accessToken() {
    var accessToken = null;

    const authInstance = gapi && gapi.auth2 && gapi.auth2.getAuthInstance();

    if (authInstance) {
      const currentUser =
        authInstance &&
        authInstance.currentUser &&
        authInstance.currentUser.get();

      if (currentUser) {
        const authResponse = currentUser.getAuthResponse(true);
        if (authResponse) {
          if ("access_token" in authResponse) {
            accessToken = authResponse.access_token;
          }
        }
      }
    } else {
      console.log("Invalid authInstance in image-file-uploader");
    }

    return accessToken;
  }

  /// @brief Uploads the content to Drive & displays the results when complete.
  uploadFiles(files) {
    if (this.accessToken && files) {
      for (var i = 0, f; (f = files[i]); i++) {
        /// Trigger a file upload via Google Drive `MediaUploader`, then:
        const uploader = new MediaUploader({
          file: f,
          metadata: {
            title: f.name,
            mimeType: f.type,
            parents: [{id: this.parentFolderId}],
          },
          token: this.accessToken,
          onComplete: (json) => {
            this.handleDragLeave();

            /// - Parse the uploaded file response metadata
            const data = JSON.parse(json);

            /// - Check if a valid web content link was created/found
            if (data && data.id) {
              /// - Determine the URL for a 300px thumbnail image
              const url = "https://drive.google.com/thumbnail";
              var src = `${url}?id=${data.id}&sz=w300-c`;
              /// - Update displayed image
              this.src = src;

              this.clearUploadedFiles();
            }
          },
        });
        uploader.upload();
      }
    } else {
      console.log(`Invalid or missing accessToken: '${this.accessToken}'`);
    }
  }

  /// @brief Clear the temporary data storage of the uploaded file.
  clearUploadedFiles() {
    const el = this.shadowRoot.getElementById("file-input");
    if (el && el.value) {
      el.value = "";
    }
  }

  /// @brief Called when files are uploaded via drag n' drop.
  handleDraggedFileUpload(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    this.uploadFiles(evt.dataTransfer.files);
  }

  /// @brief Called when files are uploaded via the OS file picker dialog.
  handleSelectedFileUpload(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    this.uploadFiles(evt.target.files);
  }

  /// @brief `dragover` handler to set the drop effect.
  handleDragOver(evt) {
    const el = this.shadowRoot.getElementById("drop_zone");
    if (el) {
      el.style.borderWidth = "2px";
    }

    const hint = this.shadowRoot.getElementById("drop_hint");
    if (hint) {
      hint.style.display = "block";
    }

    if (evt) {
      evt.stopPropagation();
      evt.preventDefault();
      evt.dataTransfer.dropEffect = "copy";
    }
  }

  /// @brief `dragleave` handler to clear the drop effect.
  handleDragLeave(evt) {
    const el = this.shadowRoot.getElementById("drop_zone");
    if (el) {
      el.style.borderWidth = "0px";
    }

    const hint = this.shadowRoot.getElementById("drop_hint");
    if (hint) {
      hint.style.display = "none";
    }

    if (evt) {
      evt.stopPropagation();
      evt.preventDefault();
    }
  }
}

customElements.define("image-file-uploader", ImageFileUploader);
/// @}

/*
 * Helper for implementing retries with backoff. Initial retry
 * delay is 1 second, increasing by 2x (+jitter) for subsequent retries
 *
 * @constructor
 */
var RetryHandler = function() {
  this.interval = 1000; // Start at one second
  this.maxInterval = 60 * 1000; // Don't wait longer than a minute
};

/*
 * Invoke the function after waiting
 *
 * @param {function} fn Function to invoke
 */
RetryHandler.prototype.retry = function(fn) {
  setTimeout(fn, this.interval);
  this.interval = this.nextInterval_();
};

/*
 * Reset the counter (e.g. after successful request.)
 */
RetryHandler.prototype.reset = function() {
  this.interval = 1000;
};

/*
 * Calculate the next wait time.
 * @return {number} Next wait interval, in milliseconds
 *
 * @private
 */
RetryHandler.prototype.nextInterval_ = function() {
  var interval = this.interval * 2 + this.getRandomInt_(0, 1000);
  return Math.min(interval, this.maxInterval);
};

/*
 * Get a random int in the range of min to max. Used to add jitter to wait times.
 *
 * @param {number} min Lower bounds
 * @param {number} max Upper bounds
 * @private
 */
RetryHandler.prototype.getRandomInt_ = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

/*
 * Helper class for resumable uploads using XHR/CORS. Can upload any Blob-like item, whether
 * files or in-memory constructs.
 *
 * @example
 * var content = new Blob(["Hello world"], {"type": "text/plain"});
 * var uploader = new MediaUploader({
 *   file: content,
 *   token: accessToken,
 *   onComplete: function(data) { ... }
 *   onError: function(data) { ... }
 * });
 * uploader.upload();
 *
 * @constructor
 * @param {object} options Hash of options
 * @param {string} options.token Access token
 * @param {blob} options.file Blob-like item to upload
 * @param {string} [options.fileId] ID of file if replacing
 * @param {object} [options.params] Additional query parameters
 * @param {string} [options.contentType] Content-type, if overriding the type of the blob.
 * @param {object} [options.metadata] File metadata
 * @param {function} [options.onComplete] Callback for when upload is complete
 * @param {function} [options.onProgress] Callback for status for the in-progress upload
 * @param {function} [options.onError] Callback if upload fails
 */
var MediaUploader = function(options) {
  var noop = function() {};
  this.file = options.file;
  this.contentType =
    options.contentType || this.file.type || "application/octet-stream";
  this.metadata = options.metadata || {
    title: this.file.name,
    mimeType: this.contentType,
  };
  this.token = options.token;
  this.onComplete = options.onComplete || noop;
  this.onProgress = options.onProgress || noop;
  this.onError = options.onError || noop;
  this.offset = options.offset || 0;
  this.chunkSize = options.chunkSize || 0;
  this.retryHandler = new RetryHandler();

  this.url = options.url;
  if (!this.url) {
    var params = options.params || {};
    params.uploadType = "resumable";
    this.url = this.buildUrl_(options.fileId, params, options.baseUrl);
  }
  this.httpMethod = options.fileId ? "PUT" : "POST";
};

/*
 * Initiate the upload.
 */
MediaUploader.prototype.upload = function() {
  var self = this;
  var xhr = new XMLHttpRequest();

  xhr.open(this.httpMethod, this.url, true);
  xhr.setRequestHeader("Authorization", "Bearer " + this.token);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("X-Upload-Content-Length", this.file.size);
  xhr.setRequestHeader("X-Upload-Content-Type", this.contentType);

  xhr.onload = function(e) {
    if (e.target.status < 400) {
      var location = e.target.getResponseHeader("Location");
      this.url = location;
      this.sendFile_();
    } else {
      this.onUploadError_(e);
    }
  }.bind(this);
  xhr.onerror = this.onUploadError_.bind(this);
  xhr.send(JSON.stringify(this.metadata));
};

/*
 * Send the actual file content.
 *
 * @private
 */
MediaUploader.prototype.sendFile_ = function() {
  var content = this.file;
  var end = this.file.size;

  if (this.offset || this.chunkSize) {
    // Only bother to slice the file if we're either resuming or uploading in chunks
    if (this.chunkSize) {
      end = Math.min(this.offset + this.chunkSize, this.file.size);
    }
    content = content.slice(this.offset, end);
  }

  var xhr = new XMLHttpRequest();
  xhr.open("PUT", this.url, true);
  xhr.setRequestHeader("Content-Type", this.contentType);
  xhr.setRequestHeader(
    "Content-Range",
    "bytes " + this.offset + "-" + (end - 1) + "/" + this.file.size
  );
  xhr.setRequestHeader("X-Upload-Content-Type", this.file.type);
  if (xhr.upload) {
    xhr.upload.addEventListener("progress", this.onProgress);
  }
  xhr.onload = this.onContentUploadSuccess_.bind(this);
  xhr.onerror = this.onContentUploadError_.bind(this);
  xhr.send(content);
};

/*
 * Query for the state of the file for resumption.
 *
 * @private
 */
MediaUploader.prototype.resume_ = function() {
  var xhr = new XMLHttpRequest();
  xhr.open("PUT", this.url, true);
  xhr.setRequestHeader("Content-Range", "bytes */" + this.file.size);
  xhr.setRequestHeader("X-Upload-Content-Type", this.file.type);
  if (xhr.upload) {
    xhr.upload.addEventListener("progress", this.onProgress);
  }
  xhr.onload = this.onContentUploadSuccess_.bind(this);
  xhr.onerror = this.onContentUploadError_.bind(this);
  xhr.send();
};

/*
 * Extract the last saved range if available in the request.
 *
 * @param {XMLHttpRequest} xhr Request object
 */
MediaUploader.prototype.extractRange_ = function(xhr) {
  var range = xhr.getResponseHeader("Range");
  if (range) {
    this.offset = parseInt(range.match(/\d+/g).pop(), 10) + 1;
  }
};

/*
 * Handle successful responses for uploads. Depending on the context,
 * may continue with uploading the next chunk of the file or, if complete,
 * invokes the caller's callback.
 *
 * @private
 * @param {object} e XHR event
 */
MediaUploader.prototype.onContentUploadSuccess_ = function(e) {
  if (e.target.status == 200 || e.target.status == 201) {
    this.onComplete(e.target.response);
  } else if (e.target.status == 308) {
    this.extractRange_(e.target);
    this.retryHandler.reset();
    this.sendFile_();
  } else {
    this.onContentUploadError_(e);
  }
};

/*
 * Handles errors for uploads. Either retries or aborts depending
 * on the error.
 *
 * @private
 * @param {object} e XHR event
 */
MediaUploader.prototype.onContentUploadError_ = function(e) {
  if (e.target.status && e.target.status < 500) {
    this.onError(e.target.response);
  } else {
    this.retryHandler.retry(this.resume_.bind(this));
  }
};

/*
 * Handles errors for the initial request.
 *
 * @private
 * @param {object} e XHR event
 */
MediaUploader.prototype.onUploadError_ = function(e) {
  this.onError(e.target.response); // TODO - Retries for initial upload
};

/*
 * Construct a query string from a hash/object
 *
 * @private
 * @param {object} [params] Key/value pairs for query string
 * @return {string} query string
 */
MediaUploader.prototype.buildQuery_ = function(params) {
  params = params || {};
  return Object.keys(params)
    .map(function(key) {
      return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
    })
    .join("&");
};

/*
 * Build the drive upload URL
 *
 * @private
 * @param {string} [id] File ID if replacing
 * @param {object} [params] Query parameters
 * @return {string} URL
 */
MediaUploader.prototype.buildUrl_ = function(id, params, baseUrl) {
  var url = baseUrl || "https://www.googleapis.com/upload/drive/v2/files/";
  if (id) {
    url += id;
  }
  var query = this.buildQuery_(params);
  if (query) {
    url += "?" + query;
  }
  return url;
};
