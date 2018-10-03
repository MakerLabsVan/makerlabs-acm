import {LitElement, html} from "@polymer/lit-element";
import "@vaadin/vaadin-combo-box/theme/material/vaadin-combo-box.js";
class UserSearchBar extends LitElement {
  static get properties() {
    return {items: {type: Array}};
  }

  constructor() {
    super();
    this.items = [];
  }

  render() {
    return html`
      <style>
        :host {
          --vaadin-combo-box-overlay-max-height: "720px";
        }
      </style>
      <vaadin-combo-box
        id="searchbox"
        class="full-width"
        style="width: 100%"
        item-value-path="Name"
        item-label-path="Name"
        @change="${this.handleSearchChanged.bind(this)}"
        items="${JSON.stringify(this.items)}"
      >
        <template>
          <paper-icon-item>
            <img
              src="[[item.Photo]]"
              style="border-radius: 50%; width: 48px; height: 48px; [[item.imageStyle]]"
              slot="item-icon"
            >
            <iron-icon
              icon="inbox"
              class="big"
              style="[[item.iconStyle]]"
              slot="item-icon"
            ></iron-icon>
            <paper-item-body two-line style="min-height: 0">
              <div style="[[item.style]]">[[item.Name]]</div>
              <div secondary style="[[item.secondaryStyle]]">
                [[item.Email]]
              </div>
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

  resetSelectedItem() {
    const searchbox = this.shadowRoot.getElementById("searchbox");
    if (searchbox && searchbox.selectedItem) {
      searchbox.selectedItem = null;
    }
  }

  mergeItem(item) {
    const searchbox = this.shadowRoot.getElementById("searchbox");
    if (item && item.type && item.MakerLabs_ID) {
      var found = false;
      for (var i = 0; i < this.items.length; ++i) {
        if (
          this.items[i].type &&
          this.items[i].type == item.type &&
          this.items[i].MakerLabs_ID &&
          this.items[i].MakerLabs_ID === item.MakerLabs_ID
        ) {
          // Update existing item
          this.items[i] = item;

          // Update searchbox selectedItem, if it is this one
          if (
            searchbox &&
            searchbox.selectedItem &&
            searchbox.selectedItem.MakerLabs_ID === item.MakerLabs_ID
          ) {
            searchbox.selectedItem = this.items[i];
          }

          found = true;
          break;
        }
      }

      if (!found) {
        this.items.push(item);
      }

      this.requestUpdate();
    }
  }
}
customElements.define("user-search-bar", UserSearchBar);
