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

/*
 * 1. @todo: remove SSR Hydration from this file, move to base
 * 2. role="list": declares that an element is a list.
 * 3. Aria lists reference: https://www.scottohara.me/blog/2018/05/26/aria-lists.html
 */

@customElement('bolt-toc')
class BoltToc extends withContext(BoltElement) {
  static get properties() {
    return {
      header: String,
      uuid: String,
    };
  }

  constructor() {
    super();
    this.uuid = this.uuid || Math.floor(10000 + Math.random() * 90000);
  }

  /* [1] */
  connectedCallback() {
    super.connectedCallback && super.connectedCallback();

    // Check if any `<ssr-keep>` elements have registered themselves here. If so, kick off the one-time hydration prep task.
    if (this.ssrKeep && !this.ssrPrepped) {
      this.ssrHydrationPrep();
    }
  }

  /* [1] */
  ssrHydrationPrep() {
    // @todo: Move this to base-element, possibly as decorator
    this.nodesToKeep = [];

    this.ssrKeep.forEach(item => {
      while (item.firstChild) {
        this.nodesToKeep.push(item.firstChild); // track the nodes that will be preserved
        this.appendChild(item.firstChild);
      }
    });

    // Remove all children not in the "keep" array
    Array.from(this.children)
      .filter(item => !this.nodesToKeep.includes(item))
      .forEach(node => {
        node.parentElement.removeChild(node);
      });

    this.ssrPrepped = true;
  }

  static get styles() {
    return [unsafeCSS(tocStyles)];
  }

  render() {
    return html`
      <nav
        class="${cx(`c-bolt-toc`)}"
        aria-labelledby="js-bolt-toc-${this.uuid}"
      >
        ${this.header &&
          html`
            <h2
              class="${cx(`c-bolt-toc__header`)}"
              id="js-bolt-toc-${this.uuid}"
            >
              ${this.header}
            </h2>
          `}
        <div class="${cx(`c-bolt-toc__list`)}" role="list">
          ${this.slotify('default')}
        </div>
      </nav>
    `;
  }
}

export { BoltToc };
