define(["../node_modules/@polymer/polymer/polymer-element.js","../node_modules/@polymer/paper-item/paper-icon-item.js","../node_modules/@polymer/paper-item/paper-item-body.js","../node_modules/@vaadin/vaadin-material-styles/vaadin-combo-box.js","../node_modules/@vaadin/vaadin-material-styles/vaadin-combo-box-item.js","../node_modules/@polymer/polymer/lib/utils/html-tag.js"],function(_polymerElement,_paperIconItem,_paperItemBody,_vaadinComboBox,_vaadinComboBoxItem,_htmlTag){"use strict";class UserSearchBar extends _polymerElement.PolymerElement{static get template(){return _htmlTag.html`
    <vaadin-combo-box id="search-bar-combo-box" style="width: 100%" item-value-path="Name" item-label-path="Name" items="[[items]]">
      <template>
        <paper-icon-item>
          <img src="[[item.Photo]]" style="border-radius: 50%; width: 48px; height: 48px;" slot="item-icon">
          <paper-item-body two-line="" style="min-height: 0">
            <div style="text-transform: capitalize">[[item.Name]]</div>
            <div secondary="">[[item.Email]]</div>
          </paper-item-body>
        </paper-icon-item>
      </template>
    </vaadin-combo-box>
`}static get is(){return"user-search-bar"}static get properties(){return{items:{type:Array,value:[]}}}ready(){super.ready();var combobox=this.shadowRoot.getElementById("search-bar-combo-box");combobox.addEventListener("change",function(){if(combobox.value){var form=document.querySelector("view-user-form");form.queryUsers("where C = '"+combobox.value+"'").then(function(q){q.send(function(res){var values=this.getFirstRowValuesFromResponse(res);if(values&&values.length){this.showUser(values)}}.bind(this))}.bind(form))}})}}customElements.define(UserSearchBar.is,UserSearchBar)});