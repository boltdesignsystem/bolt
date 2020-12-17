import {
  BoltElement,
  unsafeCSS,
  html,
  customElement,
  unsafeHTML,
} from '@bolt/element';

import styles from './block-list.scss';
import schema from '../block-list.schema';

@customElement('bolt-block-list')
class BoltBlockList extends BoltElement {
  static schema = schema;

  static get properties() {
    return {
      ...this.props,
    };
  }

  static get styles() {
    return [unsafeCSS(styles)];
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
