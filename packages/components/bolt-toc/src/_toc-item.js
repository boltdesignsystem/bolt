import { supportsCSSVars } from '@bolt/core/utils';
import classNames from 'classnames/dedupe';
import {
  customElement,
  BoltElement,
  html,
  styleMap,
  unsafeCSS,
} from '@bolt/element';
import { withContext } from 'wc-context';
import tocItemStyles from './_toc-item.scss';
import schema from '../toc.schema';

let cx = classNames.bind(tocItemStyles);

@customElement('bolt-toc-item')
class BoltTocItem extends withContext(BoltElement) {
  static get properties() {
    return {
      noCssVars: {
        type: Boolean,
        attribute: 'no-css-vars',
      },
    };
  }

  constructor() {
    super();
    this.noCssVars = supportsCSSVars ? false : true;
  }

  static get styles() {
    return [unsafeCSS(tocItemStyles)];
  }

  render() {
    return html`
      <a class="${cx(`c-bolt-toc-item`)}" href="#">
        ${this.slotify('default')}
      </a>
    `;
  }
}

export { BoltTocItem };
