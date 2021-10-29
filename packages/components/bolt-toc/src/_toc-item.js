import {
  customElement,
  BoltElement,
  html,
  ifDefined,
  unsafeCSS,
} from '@bolt/element';
import { withContext } from 'wc-context/lit-element';
import {
  smoothScroll,
  scrollOptions,
} from '@bolt/components-smooth-scroll/src/smooth-scroll';
import classNames from 'classnames/bind';
// import styles from './_toc-item.scss';
import schema from '../toc.schema';

let cx = classNames.bind(styles);

/*
 * 1. role="presentation": declares that an element is being used only for presentation and therefore does not have any accessibility semantics. This is necessary for telling Firefox + NVDA to correctly announce the number of listitems in a list.
 * 2. role="listitem": declares that an element is a single item in a list.
 * 3. Aria lists reference: https://www.scottohara.me/blog/2018/05/26/aria-lists.html
 */

@customElement('bolt-toc-item')
class BoltTocItem extends withContext(BoltElement) {
  static schema = schema.properties.items.items;

  static get properties() {
    return {
      ...this.props,
      role: {
        type: String,
        reflect: true,
      },
      scrollOffset: {
        type: Number,
      },
      scrollOffsetSelector: {
        type: String,
      },
    };
  }

  constructor() {
    super();
    this.role = 'presentation';
  }

  // static get styles() {
  //   return [unsafeCSS(styles)];
  // }

  static get observedContexts() {
    return ['activeItem', 'scrollOffsetSelector', 'scrollOffset'];
  }

  connectedCallback() {
    super.connectedCallback && super.connectedCallback();

    if (this.url && this.url.indexOf('#') === 0) {
      this.waypointElement = document.querySelector(this.url);
    }
  }

  contextChangedCallback(name, oldValue, value) {
    if (name === 'activeItem') {
      this.active = value === this;
    } else {
      this[name] = value;
    }
  }

  handleClick(event) {
    try {
      if (this.waypointElement) {
        event.preventDefault();
        let scrollOpts = scrollOptions;

        const scrollOffset = this.scrollOffset || 0;
        const scrollOffsetElemHeight =
          this.scrollOffsetSelector &&
          document.querySelector(this.scrollOffsetSelector)
            ? document.querySelector(this.scrollOffsetSelector).clientHeight
            : 0;

        scrollOpts.offset = scrollOffset + scrollOffsetElemHeight;

        // Delete the default `header` value: https://github.com/cferdinandi/smooth-scroll#fixed-headers
        // It works with fixed but not sticky elements. For consistency, handle scroll position entirely through `offset`.
        // @todo We need a solution for multiple stacked fixed/sticky elements. Also see `onPositionChange()` in toc.js.
        delete scrollOpts.header;

        smoothScroll.animateScroll(
          this.waypointElement,
          this.shadowLink,
          scrollOpts,
        );
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
    super.firstUpdated && super.firstUpdated();
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
          @click="${this.handleClick}"
        >
          ${this.slotify('default')}
        </a>
      </div>
    `;
  }
}

export { BoltTocItem };
