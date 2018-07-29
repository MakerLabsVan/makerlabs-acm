import {LitElement, html} from "@polymer/lit-element";

import "@vaadin/vaadin-combo-box/theme/material/vaadin-combo-box.js";

class UserSearchBar extends LitElement {
  static get properties() {
    return {
      items: {
        type: Array,
      },
    };
  }

  constructor() {
    super();
    this.items = this.items || [];
  }

  _render({items}) {
    return html`
      <vaadin-combo-box
        id="searchbox"
        style="width: 100%"
        item-value-path="Name"
        item-label-path="Name"
        items="${items}"
        on-change="${this.handleSearchChanged.bind(this)}"
        class="full-width"
      >
        <template>
          <paper-icon-item>
            <img src="[[item.Photo]]" style="border-radius: 50%; width: 48px; height: 48px; [[item.imageStyle]]" slot="item-icon">
            <iron-icon icon="inbox" class="big" style="[[item.iconStyle]]" slot="item-icon"></iron-icon>
            <paper-item-body two-line="" style="min-height: 0">
              <div style="[[item.style]]">[[item.Name]]</div>
              <div secondary="" style="[[item.secondaryStyle]]">[[item.Email]]</div>
            </paper-item-body>
          </paper-icon-item>
        </template>
      </vaadin-combo-box>
    `;
  }

  handleSearchChanged() {
    const searchbox = this.shadowRoot.getElementById("searchbox");
    if (searchbox && searchbox.selectedItem) {
      this.dispatchEvent(
        new CustomEvent("search", {detail: {...searchbox.selectedItem}})
      );
    }
  }
}

customElements.define("user-search-bar", UserSearchBar);
