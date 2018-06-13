define(["./app-shell.js"],function(_appShell){"use strict";class ImageFileUploader extends _appShell.PolymerElement{static get template(){return _appShell.html`
    <style>
      #drop_zone {
        height: 200px;
        border: 0px dashed #bbb;
        -moz-border-radius: 5px;
        -webkit-border-radius: 5px;
        border-radius: 5px;
        padding: 25px;
        margin-bottom: 8px;
        text-align: center;
        font: 20pt bold 'Helvetica';
        color: #bbb;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
      }
      #drop_hint {
        display: none;
      }
    </style>

    <div id="drop_zone" style="background-image: url([[src]]);">
      <span id="drop_hint">Drop files here</span>
    </div>
`}static get is(){return"image-file-uploader"}static get properties(){return{src:{type:String,value:"data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="},emptyImageData:{type:String,value:"data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="}}}get accessToken(){var accessToken=null,authInstance=gapi&&gapi.auth2&&gapi.auth2.getAuthInstance();if(authInstance){var currentUser=authInstance&&authInstance.currentUser&&authInstance.currentUser.get();if(currentUser){var authResponse=currentUser.getAuthResponse(!0);if(authResponse){if("access_token"in authResponse){accessToken=authResponse.access_token}}}}return accessToken}handleFileSelect(evt){evt.stopPropagation();evt.preventDefault();if(this.accessToken){for(var files=evt.dataTransfer.files,i=0,f,uploader;f=files[i];i++){uploader=new MediaUploader({file:f,token:this.accessToken,onComplete:function(json){this.handleDragLeave();var data=JSON.parse(json);if(data&&data.webContentLink){this.src=data.webContentLink}}.bind(this)});uploader.upload()}}else{console.log("Missing accessToken")}}handleDragOver(evt){var el=this.shadowRoot.getElementById("drop_zone");if(el){el.style.borderWidth="2px"}var hint=this.shadowRoot.getElementById("drop_hint");if(hint){hint.style.display="block"}if(evt){evt.stopPropagation();evt.preventDefault();evt.dataTransfer.dropEffect="copy"}}handleDragLeave(evt){var el=this.shadowRoot.getElementById("drop_zone");if(el){el.style.borderWidth="0px"}var hint=this.shadowRoot.getElementById("drop_hint");if(hint){hint.style.display="none"}if(evt){evt.stopPropagation();evt.preventDefault()}}ready(){super.ready();var el=this.shadowRoot.getElementById("drop_zone");el.addEventListener("dragover",this.handleDragOver.bind(this),!1);el.addEventListener("dragleave",this.handleDragLeave.bind(this),!1);el.addEventListener("drop",this.handleFileSelect.bind(this),!1)}}customElements.define(ImageFileUploader.is,ImageFileUploader)});