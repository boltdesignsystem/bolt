import classNames from 'classnames/dedupe';
import {
  customElement,
  BoltElement,
  html,
  styleMap,
  unsafeCSS,
} from '@bolt/element';
import { withContext } from 'wc-context';
import menuStyles from './menu.scss';
import schema from '../menu.schema';
import './_menu-item';

let cx = classNames.bind(menuStyles);

@customElement('bolt-menu')
class BoltMenu extends withContext(BoltElement) {
  static get properties() {
    return {
      spacing: String,
      role: {
        type: String,
        reflect: true,
      },
    };
  }

  static get providedContexts() {
    return {
      spacing: { value: schema.properties.spacing.default },
    };
  }

  constructor() {
    super();
    this.role = 'menu';
  }

  static get styles() {
    return [unsafeCSS(menuStyles)];
  }

  connectedCallback() {
    super.connectedCallback && super.connectedCallback();

    this.updateProvidedContext(
      'spacing',
      this.spacing || schema.properties.spacing.default,
    );
  }

  render() {
    // @todo: automatic schema validation?
    const spacing = this.spacing || schema.properties.spacing.default;
    this.updateProvidedContext('spacing', spacing);

    const classes = cx('c-bolt-menu__title', {
      [`c-bolt-menu__title--spacing-${spacing}`]: spacing,
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
