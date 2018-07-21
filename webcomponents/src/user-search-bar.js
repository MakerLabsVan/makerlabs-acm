import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";

import "@vaadin/vaadin-combo-box/vaadin-combo-box.js";

class UserSearchBar extends PolymerElement {
  static get template() {
    return html`
    <vaadin-combo-box id="searchbox" style="width: 100%" item-value-path="Name" item-label-path="Name" items="[[items]]" on-change="_onSearchChanged" class="full-width">
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

  static get properties() {
    return {
      items: {
        type: Array,
        value: []
      }
    };
  }

  _onSearchChanged() {
    if (this.$.searchbox && this.$.searchbox.value) {
      const q = this.$.searchbox.value;
      this.dispatchEvent(new CustomEvent("search", { detail: { q } }));
    }
  }
}

customElements.define("user-search-bar", UserSearchBar);
