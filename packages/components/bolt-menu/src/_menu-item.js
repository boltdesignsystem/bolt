import { supportsCSSVars } from '@bolt/core/utils';
import classNames from 'classnames/dedupe';
import {
  customElement,
  BoltElement,
  html,
  styleMap,
  unsafeCSS,
  ifDefined,
} from '@bolt/element';
import menuStyles from './_menu-item.scss';

let cx = classNames.bind(menuStyles);

@customElement('bolt-menu-item')
class BoltMenuItem extends BoltElement {
  static get properties() {
    return {
      url: String,
    };
  }

  constructor() {
    super();
    this.noCssVars = supportsCSSVars ? false : true;
  }

  static get styles() {
    return [unsafeCSS(menuStyles)];
  }

  render() {
    console.log('rendering menu item');
    return html`
      <bolt-trigger
        display="block"
        no-outline
        url="${ifDefined(this.url ? this.url : undefined)}"
      >
        <div class="${cx(`c-bolt-menu-item`)}">
          ${this.slotify('default')}
        </div>
      </bolt-trigger>
    `;
  }
}

export { BoltMenuItem };
