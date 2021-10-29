import {
  customElement,
  BoltElement,
  html,
  unsafeCSS,
  ifDefined,
} from '@bolt/element';
import classNames from 'classnames/dedupe';
import { withContext } from 'wc-context/lit-element';
// import menuStyles from './_menu-item.scss';
import schema from '../menu.schema';

let cx = classNames.bind(menuStyles);

@customElement('bolt-menu-item')
class BoltMenuItem extends withContext(BoltElement) {
  static schema = schema.properties.items.items;

  static get properties() {
    const { url, target } = this.props;
    return {
      url,
      target,
      spacing: {
        type: String,
      },
      role: {
        type: String,
        reflect: true,
      },
    };
  }

  contextChangedCallback(name, oldValue, value) {
    this[name] = value;
  }

  // static get styles() {
  //   return [unsafeCSS(menuStyles)];
  // }

  constructor() {
    super();
    this.role = 'presentation';
  }

  get parentComponent() {
    return this.closest('bolt-menu');
  }

  get allMenuItems() {
    return this.parentComponent.querySelectorAll('bolt-menu-item');
  }

  render() {
    const isLast =
      this.allMenuItems &&
      this.allMenuItems.item(this.allMenuItems.length - 1) === this;

    const classes = cx('c-bolt-menu-item', {
      [`c-bolt-menu-item--spacing-${this.spacing}`]: this.spacing,
    });

    return html`
      <bolt-trigger
        display="block"
        no-outline
        url="${ifDefined(this.url ? this.url : undefined)}"
        target="${ifDefined(this.target ? this.target : undefined)}"
        role="menuitem"
      >
        <span class="${cx('c-bolt-menu-item')}">
          ${this.slotMap.get('icon-before') &&
            html`
              <span
                class="${cx('c-bolt-menu-item__icon-before')}"
                aria-hidden="true"
              >
                ${this.slotify('icon-before')}
              </span>
            `}
          ${this.slotify('default')}
          ${this.slotMap.get('icon-after') &&
            html`
              <span
                class="${cx('c-bolt-menu-item__icon-after')}"
                aria-hidden="true"
              >
                ${this.slotify('icon-after')}
              </span>
            `}
        </span>
      </bolt-trigger>
    `;
  }
}

export { BoltMenuItem };
