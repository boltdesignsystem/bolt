import { html, customElement, BoltElement, unsafeCSS } from '@bolt/element';
import classNames from 'classnames/bind';
import styles from './li.scss';
import schema from '../li.schema';

let cx = classNames.bind(styles);

@customElement('bolt-li')
class BoltListItem extends BoltElement {
  static schema = schema;

  static get properties() {
    return {
      last: { type: Boolean },
      level: { type: Number },
      type: { type: String },
    };
  }

  static get styles() {
    return [unsafeCSS(styles)];
  }

  connectedCallback() {
    super.connectedCallback && super.connectedCallback();

    // Defaults to 1, incremented as necessary by parent OL/UL.
    this.level = 1;

    const closestList = this.parentNode.closest('bolt-ul, bolt-ol');
    if (closestList) {
      this.type = closestList.tagName === 'BOLT-OL' ? 'ol' : 'ul';
    }
  }

  render() {
    const classes = cx('c-bolt-li', {
      [`c-bolt-li--l${this.level}`]: this.level,
      [`c-bolt-li--${this.type}-item`]: this.type,
      [`c-bolt-li--last-item`]: this.last,
      [`c-bolt-li--level-${this.level % 3 !== 0 ? this.level % 3 : 3}`]: this
        .level, // allow up to 3 levels of nested styles before repeating
    });

    return html`
      <div class="${classes}" role="listitem">
        ${this.slotify('default')}
      </div>
    `;
  }
}

export { BoltListItem };
