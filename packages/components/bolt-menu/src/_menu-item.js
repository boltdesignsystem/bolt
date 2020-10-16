import {
  customElement,
  BoltElement,
  html,
  unsafeCSS,
  ifDefined,
} from '@bolt/element';
import classNames from 'classnames/dedupe';
import { withContext } from 'wc-context/lit-element';
import menuStyles from './_menu-item.scss';
import schema from '../menu.schema';

let cx = classNames.bind(menuStyles);

@customElement('bolt-menu-item')
class BoltMenuItem extends withContext(BoltElement) {
  static schema = schema;

  static get properties() {
    const { url, spacing } = this.props;
    return {
      url,
      spacing,
      role: {
        type: String,
        reflect: true,
      },
    };
  }

  static get observedContexts() {
    return ['spacing'];
  }

  contextChangedCallback(name, oldValue, value) {
    this[name] = value;
  }

  static get styles() {
    return [unsafeCSS(menuStyles)];
  }

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
      [`c-bolt-menu-item--last-item`]: isLast,
    });

    return html`
      <bolt-trigger
        display="block"
        no-outline
        url="${ifDefined(this.url ? this.url : undefined)}"
        role="menuitem"
      >
        <div class="${classes}">
          ${this.slotify('default')}
        </div>
      </bolt-trigger>
    `;
  }
}

export { BoltMenuItem };
