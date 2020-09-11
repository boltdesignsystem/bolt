import { customElement, BoltElement, html, unsafeCSS } from '@bolt/element';
import { withContext } from 'wc-context';
import classNames from 'classnames/bind';
import styles from './_list-item.scss';
import schema from '../list.schema';

let cx = classNames.bind(styles);

@customElement('bolt-list-item')
class BoltListItem extends withContext(BoltElement) {
  static schema = schema;

  static get properties() {
    return {
      ...this.props,
      last: { type: Boolean },
    };
  }

  static get observedContexts() {
    return ['align', 'display', 'inset', 'separator', 'spacing', 'tag'];
  }

  contextChangedCallback(name, oldValue, value) {
    this[name] = value;
  }

  static get styles() {
    return [unsafeCSS(styles)];
  }

  connectedCallback() {
    super.connectedCallback && super.connectedCallback();
  }

  get parentComponent() {
    return this.closest('bolt-list');
  }

  get allListItems() {
    return this.parentComponent.querySelectorAll('bolt-list-item');
  }

  render() {
    const isLast =
      this.allListItems &&
      this.allListItems.item(this.allListItems.length - 1) === this;

    const classes = cx('c-bolt-list-item', {
      [`c-bolt-list-item--align-${this.align}`]: this.align,
      [`c-bolt-list-item--display-${this.display}`]: this.display,
      [`c-bolt-list-item--inset`]: this.inset,
      [`c-bolt-list-item--last-item`]: isLast,
      [`c-bolt-list-item--separator-${this.separator}`]:
        this.separator !== 'none',
      [`c-bolt-list-item--spacing-${this.spacing}`]: this.spacing !== 'none',
    });

    return html`
      ${this.tag === 'ul' || this.tag === 'ol'
        ? html`
            <div class="${classes}" role="listitem">
              ${this.slotify('default')}
            </div>
          `
        : html`
            <span class="${classes}">${this.slotify('default')} </span>
          `}
    `;
  }
}

export { BoltListItem };
