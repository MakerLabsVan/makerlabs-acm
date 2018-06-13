import { PolymerElement } from '@polymer/polymer/polymer-element.js';

/* Material Design Card/Item Components */
import '@polymer/paper-item/paper-icon-item.js';
import '@polymer/paper-item/paper-item-body.js';

/* Vaadin Components */
import '@vaadin/vaadin-material-styles/vaadin-combo-box.js';
import '@vaadin/vaadin-material-styles/vaadin-combo-box-item.js';

import { html } from '@polymer/polymer/lib/utils/html-tag.js';

class UserSearchBar extends PolymerElement {
  static get template() {
    return html`
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
`;
  }

  static get is() { return 'user-search-bar'; }

  static get properties() {
    return {
      items: {
        type: Array,
        value: []
      }
    }
  }

  ready() {
    super.ready();

    var combobox = this.shadowRoot.getElementById('search-bar-combo-box');

    combobox.addEventListener('change', function(e) {
      if (combobox.value) {
        var form = document.querySelector('view-user-form');
        form.queryUsers("where C = '" + combobox.value + "'").then(function(q) {
          q.send(function(res) {
            var values = this.getFirstRowValuesFromResponse(res);
            if (values && values.length) {
              this.showUser(values);
            }
          }.bind(this));
        }.bind(form));
      }
    });
  }
}

customElements.define(UserSearchBar.is, UserSearchBar);
