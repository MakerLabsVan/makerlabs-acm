define(["../node_modules/@polymer/polymer/polymer-element.js","../node_modules/@polymer/iron-icons/iron-icons.js","../node_modules/@polymer/app-layout/app-grid/app-grid-style.js","../node_modules/@polymer/paper-item/paper-item.js","../node_modules/@polymer/paper-item/paper-icon-item.js","../node_modules/@polymer/paper-item/paper-item-body.js","../node_modules/@polymer/paper-card/paper-card.js","../node_modules/@polymer/paper-input/paper-input.js","../node_modules/@polymer/paper-checkbox/paper-checkbox.js","../node_modules/@polymer/paper-dropdown-menu/paper-dropdown-menu.js","../node_modules/@polymer/paper-listbox/paper-listbox.js","../node_modules/@polymer/paper-radio-group/paper-radio-group.js","../node_modules/@polymer/paper-radio-button/paper-radio-button.js","../node_modules/@polymer/paper-fab/paper-fab.js","../node_modules/@polymer/paper-tooltip/paper-tooltip.js","../node_modules/@vaadin/vaadin-material-styles/vaadin-date-picker.js","../node_modules/@vaadin/vaadin-material-styles/vaadin-combo-box.js","../node_modules/@vaadin/vaadin-material-styles/vaadin-combo-box-item.js","../node_modules/@vaadin/vaadin-date-picker/vaadin-date-picker-light.js","../node_modules/google-signin/google-signin.js","../node_modules/google-apis/google-apis.js","../node_modules/google-chart/google-chart-loader.js","./image-file-uploader.js","../node_modules/@polymer/polymer/lib/utils/html-tag.js"],function(_polymerElement,_ironIcons,_appGridStyle,_paperItem,_paperIconItem,_paperItemBody,_paperCard,_paperInput,_paperCheckbox,_paperDropdownMenu,_paperListbox,_paperRadioGroup,_paperRadioButton,_paperFab,_paperTooltip,_vaadinDatePicker,_vaadinComboBox,_vaadinComboBoxItem,_vaadinDatePickerLight,_googleSignin,_googleApis,_googleChartLoader,_imageFileUploader,_htmlTag){"use strict";class ViewUserForm extends _polymerElement.PolymerElement{static get template(){return _htmlTag.html`
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
`}static get is(){return"view-user-form"}static get properties(){return{fields:{type:Array},userName:{type:String},query:{type:Object}}}get sheetId(){return"1Sd3nYY34dllVUsakwU8hLnJQ1m-U50qZwQSxst2SKKg"}get usersSheetGid(){return"653502556"}get usersSheetNumHeaders(){return 2}get activitySheetGid(){return"1547381894"}get activitySheetNumHeaders(){return 1}get sheetName(){return"Users"}get hiddenSectionNames(){return["Initial","Hidden","Private"]}get tagIdColumn(){return"T"}get nameColumn(){return"C"}get makerLabsIdColumn(){return"I"}get searchColumns(){return"A,B,C,D,E,F,G,H,I"}get defaultPhotoUrl(){return"https://drive.google.com/a/p-rimes.net/uc?id=1nevGbxJUGvdw9MkuF1iBfuoR9cfvss-6&export=download"}get accessToken(){var accessToken=null,authInstance=gapi&&gapi.auth2&&gapi.auth2.getAuthInstance();if(authInstance){var currentUser=authInstance&&authInstance.currentUser&&authInstance.currentUser.get();if(currentUser){var authResponse=currentUser.getAuthResponse(!0);if(authResponse){if("access_token"in authResponse){accessToken=authResponse.access_token}}}}return accessToken}_sectionIsHidden(section){return section&&-1!=this.hiddenSectionNames.indexOf(section.title)}_fieldIsCheckboxType(field){return"VALUE_IN_LIST"===field.type&&2==field.choices.length&&this.isNoLike(field.choices[0])&&this.isYesLike(field.choices[1])}_fieldIsRadioGroupType(field){return"VALUE_IN_LIST"===field.type&&3>=field.choices.length&&!this._fieldIsCheckboxType(field)}_fieldIsDropdownMenuType(field){return"VALUE_IN_LIST"===field.type&&3<field.choices.length}_fieldIsDatePickerType(field){return"DATE_AFTER"==field.type||"DATE_BEFORE"==field.type||"DATE_BETWEEN"==field.type||"DATE_EQUAL_TO"==field.type||"DATE_IS_VALID_DATE"==field.type||"DATE_NOT_BETWEEN"==field.type||"DATE_ON_OR_AFTER"==field.type||"DATE_ON_OR_BEFORE"==field.type}_fieldIsTextInputType(field){return!this._fieldIsTagIdType(field)&&(!field.type||"NUMBER_BETWEEN"==field.type||"NUMBER_EQUAL_TO"==field.type||"NUMBER_GREATER_THAN"==field.type||"NUMBER_GREATER_THAN_OR_EQUAL_TO"==field.type||"NUMBER_LESS_THAN"==field.type||"NUMBER_LESS_THAN_OR_EQUAL_TO"==field.type||"NUMBER_NOT_BETWEEN"==field.type||"NUMBER_NOT_EQUAL_TO"==field.type||"TEXT_CONTAINS"==field.type||"TEXT_DOES_NOT_CONTAIN"==field.type||"TEXT_EQUAL_TO"==field.type||"TEXT_IS_VALID_EMAIL"==field.type)}_fieldIsTagIdType(field){return field.name===this.tagIdColumn}_fieldIsImageType(field){return"TEXT_IS_VALID_URL"===field.type}connectedCallback(){super.connectedCallback();this._updateGridStyles=this._updateGridStyles||function(){this.updateStyles()}.bind(this);window.addEventListener("resize",this._updateGridStyles);var aware=this.shadowRoot.querySelector("google-signin-aware");aware.handleAuthSignIn=this.handleAuthSignIn;aware.handleAuthSignOut=this.handleAuthSignOut;aware.handleAuthStateChange=this.handleAuthStateChange}ready(){super.ready();var intervalId=setInterval(function(){if(gapi.client){for(var clients=this.querySelectorAll("google-client-loader"),i=0;i<clients.length;i++){console.log("Force loaded gapi.client");clients[i]._loadClient()}clearInterval(intervalId)}else{console.log("Missing gapi.client");gapi.load("client",function(){})}}.bind(this),2e3);console.log("initialQuery");console.log(this.query);if(this.query&&"name"in this.query){this.userName=this.query.name;this.queryUsers("where "+this.nameColumn+" = '"+this.userName+"'").then(function(q){q.send(function(res){var values=this.getFirstRowValuesFromResponse(res);if(values&&values.length){this.showUser(values)}}.bind(this))}.bind(this))}}disconnectedCallback(){window.removeEventListener("resize",this._updateGridStyles)}getValuesFromResponse(res){var datatable=res.getDataTable(),values=[];if(datatable&&datatable.getNumberOfRows()&&datatable.getNumberOfColumns()){for(var rowIdx=0,rowValues;rowIdx<datatable.getNumberOfRows();rowIdx++){rowValues=[];for(var colIdx=0;colIdx<datatable.getNumberOfColumns();colIdx++){rowValues.push(datatable.getValue(rowIdx,colIdx))}values.push(rowValues)}}return values}getFirstRowValuesFromResponse(res){var values=this.getValuesFromResponse(res);return values&&values.length&&values[0]}handleAuthSignIn(){console.log("did get sign in");if(this.accessToken){if(this.userName){this.queryUsers("where "+this.nameColumn+" = '"+this.userName+"'").then(function(q){q.send(function(res){var values=this.getFirstRowValuesFromResponse(res);if(values&&values.length){this.showUser(values)}}.bind(this))}.bind(this))}var makerLabsIdPrev="";window.setInterval(function(){this.queryActivity("select B where D = 'Signed_In' and A = 'Laser Lab 101' order by E desc limit 1").then(function(q){q.send(function(res){var values=this.getValuesFromResponse(res);if(values&&values.length){for(var rowIdx=0,makerLabsId;rowIdx<values.length;rowIdx++){makerLabsId=values[rowIdx][0];if(makerLabsId!=makerLabsIdPrev){console.log("Now query for makerLabsId = "+makerLabsId);this.queryUsers("where "+this.makerLabsIdColumn+" = '"+makerLabsId+"'").then(function(q){q.send(function(res){console.log("did find user");var values=this.getFirstRowValuesFromResponse(res);if(values&&values.length){this.showUser(values)}}.bind(this))}.bind(this));makerLabsIdPrev=makerLabsId}}}}.bind(this))}.bind(this))}.bind(this),5e3);var el=this.shadowRoot.getElementById(this.tagIdColumn);if(el){this.queryActivity("select C,count(E) group by "+this.tagIdColumn).then(function(q){q.send(function(res){var items=[],values=this.getValuesFromResponse(res);if(values&&values.length){for(var rowIdx=0,tagId;rowIdx<values.length;rowIdx++){tagId=values[rowIdx][0];items.push({label:"Recently scanned: "+tagId,value:tagId})}el.items=items}}.bind(this))}.bind(this))}this.queryUsers("select "+this.searchColumns).then(function(q){q.send(function(res){var datatable=res.getDataTable(),users=[],sections=this.fields.map(function(section){return section.title});if(datatable){for(var rowIdx=0;rowIdx<datatable.getNumberOfRows();rowIdx++){for(var currentSection=0,rowValues={},colIdx=0,k;colIdx<datatable.getNumberOfColumns();colIdx++){k=datatable.getColumnLabel(colIdx);if(0==k.indexOf(sections[currentSection])){k=k.substr(sections[currentSection].length+1);currentSection++}k=k.replace(/\W/g,"_");var v=datatable.getValue(rowIdx,colIdx);rowValues[k]=v}if(!("Photo"in rowValues)||!rowValues.Photo){rowValues.Photo=this.defaultPhotoUrl}if("Name"in rowValues&&rowValues.Name){users.push(rowValues)}}}var userSearchBar=document.querySelector("user-search-bar");if(userSearchBar){userSearchBar.items=users}}.bind(this))}.bind(this))}}handleAuthSignOut(){console.log("did get sign out")}querySheet(sheetGid,query,numHeaders=1){var queryString=encodeURIComponent(query),loader=this.shadowRoot.querySelector("google-chart-loader");return loader.query("https://docs.google.com/spreadsheets/d/"+this.sheetId+"/gviz/tq"+"?gid="+sheetGid+"&access_token="+this.accessToken+"&headers="+numHeaders+"&tq="+queryString)}queryUsers(query){return this.querySheet(this.usersSheetGid,query,this.usersSheetNumHeaders)}queryActivity(query){return this.querySheet(this.activitySheetGid,query,this.activitySheetNumHeaders)}handleQueryResponse(response){var data=response.getDataTable();console.log("handleQueryResponse data");console.log(data)}resetValues(){return this.showUser([])}showUser(data){for(var i=0,s=0,section;s<this.fields.length;++s){section=this.fields[s];for(var f=0;f<section.fields.length;++f){var val=i<data.length?data[i++]:null,field=section.fields[f];if(!val){val=""}if(this._fieldIsCheckboxType(field)){var el=this.shadowRoot.getElementById(field.name);el.checked=this.isYesLike(val[0])}else if(this._fieldIsRadioGroupType(field)){var el=this.shadowRoot.getElementById(field.name);el.select(val)}else if(this._fieldIsDropdownMenuType(field)){var el=this.shadowRoot.getElementById(field.name),listbox=el.querySelector("paper-listbox"),selectedIdx=field.choices.indexOf(val);listbox.selected=0<=selectedIdx?selectedIdx:0}else if(this._fieldIsDatePickerType(field)||this._fieldIsTextInputType(field)){var el=this.shadowRoot.getElementById(field.name);el.value=val}else if(this._fieldIsImageType(field)){var photoUrl=val,img=this.shadowRoot.getElementById(field.name);img.src=photoUrl}else{console.log("unknown field name "+field.name)}}}}handleSubmit(){for(var sheets=document.getElementById("sheets"),validTextFieldCount=0,formValues=[],s=0,section;s<this.fields.length;++s){section=this.fields[s];for(var f=0;f<section.fields.length;++f){var formValue,field=section.fields[f],el=this.shadowRoot.getElementById(field.name);if(el){if(this._fieldIsCheckboxType(field)){formValue=el.checked?field.choices[1]:field.choices[0]}else if(this._fieldIsRadioGroupType(field)){formValue=el.selected}else if(this._fieldIsDropdownMenuType(field)){formValue=el.value}else if(this._fieldIsDatePickerType(field)||this._fieldIsTextInputType(field)){formValue=el.value;if(formValue){validTextFieldCount++}}else if(this._fieldIsImageType(field)){console.log("check image el");console.log(el);if(el.src!=el.emptyImageData){console.log("image el.src = "+el.src);formValue=el.src}}else{console.log("unknown field "+field.name)}}formValues.push(formValue)}}if(sheets&&sheets.api&&formValues.length){var rowName=formValues[0];if(rowName){console.log("update rowName = "+rowName);sheets.api.spreadsheets.values.update({spreadsheetId:this.sheetId,range:this.sheetName+"!A"+rowName,majorDimension:"ROWS",valueInputOption:"USER_ENTERED",values:[formValues]}).then(function(response){console.log(response)})}else{console.log(formValues);if(0<validTextFieldCount){console.log("create new user");formValues[0]="=row()";sheets.api.spreadsheets.values.append({spreadsheetId:this.sheetId,range:this.sheetName,valueInputOption:"USER_ENTERED",insertDataOption:"INSERT_ROWS",values:[formValues]}).then(function(response){console.log(response)})}}}}isYesLike(s){return-1!=["\u2611","Y","y","T","t","Yes","yes","True","true"].indexOf(s)}isNoLike(s){return-1!=["\u2610","N","n","F","f","No","no","False","false"].indexOf(s)}arraysEqual(a,b){if(a===b)return!0;if(null==a||null==b)return!1;if(a.length!=b.length)return!1;for(var i=0;i<a.length;++i){if(a[i]!==b[i])return!1}return!0}}customElements.define(ViewUserForm.is,ViewUserForm)});