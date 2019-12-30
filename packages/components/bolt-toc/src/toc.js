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
import tocStyles from './toc.scss';
import schema from '../toc.schema';

let cx = classNames.bind(tocStyles);

@customElement('bolt-toc')
class BoltToc extends withContext(BoltElement) {
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
    return [unsafeCSS(tocStyles)];
  }

  render() {
    return html`
      <div class="${cx(`c-bolt-toc`)}">
        ${this.templateMap.get('header') &&
          html`
            <div class="${cx(`c-bolt-toc__header`)}">
              ${this.slotify('header')}
            </div>
          `}
        ${this.slotify('default')}
      </div>
    `;
  }
}

export { BoltToc };
