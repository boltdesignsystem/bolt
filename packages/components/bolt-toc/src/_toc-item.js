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
import { withContext } from 'wc-context';
import tocItemStyles from './_toc-item.scss';
import schema from '../toc.schema';

let cx = classNames.bind(tocItemStyles);

/*
 * 1. role="presentation": declares that an element is being used only for presentation and therefore does not have any accessibility semantics. This is necessary for telling Firefox + NVDA to correctly announce the number of listitems in a list.
 * 2. role="listitem": declares that an element is a single item in a list.
 * 3. Aria lists reference: https://www.scottohara.me/blog/2018/05/26/aria-lists.html
 */

@customElement('bolt-toc-item')
class BoltTocItem extends withContext(BoltElement) {
  static get properties() {
    return {
      url: String,
      role: {
        type: String,
        reflect: true,
      },
    };
  }

  constructor() {
    super();
    this.role = 'presentation';
  }

  static get styles() {
    return [unsafeCSS(tocItemStyles)];
  }

  render() {
    return html`
      <div role="listitem">
        <a
          class="${cx(`c-bolt-toc-item`)}"
          href="${ifDefined(this.url ? this.url : undefined)}"
        >
          ${this.slotify('default')}
        </a>
      </div>
    `;
  }
}

export { BoltTocItem };
