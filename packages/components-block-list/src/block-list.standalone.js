import {
  BoltElement,
  unsafeCSS,
  html,
  customElement,
  unsafeHTML,
} from '@bolt/element';
import blockListStyles from './block-list.scss';

@customElement('bolt-block-list')
class BoltBlockList extends BoltElement {
  static get properties() {
    return {
      items: Array,
    };
  }

  static get styles() {
    return [unsafeCSS(blockListStyles)];
  }

  connectedCallback() {
    super.connectedCallback && super.connectedCallback();
    this.items = this.items || [];
  }

  render() {
    return html`
      <ul class="c-bolt-block-list">
        ${this.items && this.items.length >= 1
          ? this.items.map(
              item =>
                html`
                  <li class="c-bolt-block-list__item">${unsafeHTML(item)}</li>
                `,
            )
          : ''}
      </ul>
    `;
  }
}

export { BoltBlockList };
