import {LitElement, html} from "@polymer/lit-element";

import "@vaadin/vaadin-combo-box/vaadin-combo-box.js";

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

  handleSearchChanged() {
    const searchbox = this.shadowRoot.getElementById("searchbox");
    if (searchbox && searchbox.value) {
      const q = searchbox.value;
      this.dispatchEvent(new CustomEvent("search", {detail: {q}}));
    }
  }
}

customElements.define("user-search-bar", UserSearchBar);
