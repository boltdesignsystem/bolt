import {
  customElement,
  BoltElement,
  html,
  ifDefined,
  unsafeCSS,
} from '@bolt/element';
import classNames from 'classnames/bind';
import { withContext } from 'wc-context';
import {
  smoothScroll,
  scrollOptions,
  getScrollTarget,
} from '@bolt/components-smooth-scroll';

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
      active: {
        type: Boolean,
        reflect: true,
      },
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

  static get observedContexts() {
    return ['activeItem'];
  }

  connectedCallback() {
    super.connectedCallback && super.connectedCallback();

    if (this.url && this.url.indexOf('#') === 0) {
      this.target = document.querySelector(this.url);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback && super.disconnectedCallback();
  }

  contextChangedCallback(name, oldValue, value) {
    if (name === 'activeItem' && value) {
      if (value === this) {
        this.active = true;
      } else {
        this.active = false;
      }
    }
  }

  onClick(event) {
    try {
      if (this.target) {
        event.preventDefault();
        smoothScroll.animateScroll(this.target, this.shadowLink, scrollOptions);
      }
    } catch (err) {
      console.log(err);
    }

    this.dispatchEvent(
      new CustomEvent('toc:activate', {
        detail: {
          activeItem: this,
          onClick: true,
        },
        bubbles: true,
      }),
    );
  }

  firstUpdated() {
    // `smoothScroll` needs the anchor as its second argument, does not
    // appear to do anything but throws an error if missing
    // https://github.com/cferdinandi/smooth-scroll#animatescroll
    this.shadowLink = this.renderRoot.querySelector('a');
  }

  render() {
    const classes = cx('c-bolt-toc-item', {
      [`c-bolt-toc-item--current`]: this.active,
    });

    return html`
      <div role="listitem">
        <a
          class="${classes}"
          href="${ifDefined(this.url ? this.url : undefined)}"
          @click="${this.onClick}"
        >
          ${this.slotify('default')}
        </a>
      </div>
    `;
  }
}

export { BoltTocItem };
