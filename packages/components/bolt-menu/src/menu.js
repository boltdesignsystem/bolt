import classNames from 'classnames/dedupe';
import { customElement, BoltElement, html, unsafeCSS } from '@bolt/element';
import { withContext } from 'wc-context/lit-element';
import menuStyles from './menu.scss';
import schema from '../menu.schema';

let cx = classNames.bind(menuStyles);

@customElement('bolt-menu')
class BoltMenu extends withContext(BoltElement) {
  static schema = schema;

  static get properties() {
    return {
      ...this.props,
      role: {
        type: String,
        reflect: true,
      },
    };
  }

  static get providedContexts() {
    return {
      spacing: { property: 'spacing' },
    };
  }

  static get styles() {
    return [unsafeCSS(menuStyles)];
  }

  constructor() {
    super();
    this.role = 'menu';
  }

  render() {
    const classes = cx('c-bolt-menu__title', {
      [`c-bolt-menu__title--spacing-${this.spacing}`]: this.spacing,
    });

    return html`
      <div class="${cx(`c-bolt-menu`)}" role="presentation">
        ${this.slotMap.get('title') &&
          html`
            <div class="${classes}">
              ${this.slotify('title')}
            </div>
          `}
        ${this.slotify('default')}
      </div>
    `;
  }
}

export { BoltMenu };
