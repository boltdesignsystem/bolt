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
  getScrollTarget,
} from '@bolt/components-smooth-scroll/src/smooth-scroll';
import isVisible from 'is-visible';
import classNames from 'classnames/bind';
import styles from './navbar-item.scss';
import schema from '../navbar-item.schema';

let cx = classNames.bind(styles);

@customElement('bolt-navbar-item')
class BoltNavbarItem extends withContext(BoltElement) {
  static schema = schema;

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
      isDropdownLink: { type: Boolean },
    };
  }

  // static useShadow = false;

  constructor() {
    super();
    this.role = 'listitem';

    this.activeClass = 'c-bolt-navbar-item--active';
  }

  static get styles() {
    return [unsafeCSS(styles)];
  }

  static get observedContexts() {
    return ['activeItem', 'scrollOffsetSelector', 'scrollOffset'];
  }

  contextChangedCallback(name, oldValue, value) {
    if (name === 'activeItem') {
      this.active = value === this;
      // setTimeout(() => {
      if (this.active) {
        this.shadowLink.classList.add(this.activeClass);
      } else {
        this.shadowLink.classList.remove(this.activeClass);
      }
      // }, 100); // delay required for css transitions, otherwise re-render breaks transition
    } else {
      this[name] = value;
    }
  }

  connectedCallback() {
    super.connectedCallback && super.connectedCallback();

    if (this.url && this.url.indexOf('#') === 0) {
      try {
        this.waypointElement = document.querySelector(this.url);
      } catch (err) {
        console.log(err);
      }
    }

    // this.addEventListener('click', this.handleClick);

    // const isAlreadyActive =
    //   // @todo
    //   this.shadowLink?.classList.contains(this.activeClass) ||
    //   this.shadowLink?.getAttribute('href') === window.location.hash ||
    //   this.active;

    // if (this.shadowLink && !this.waypointElement) {
    //   const href = this.shadowLink.getAttribute('href');
    //   if (href.indexOf('#') === 0 && href !== '#!') {
    //     const target = document.querySelector(href);
    //     if (target) {
    //       this.waypointElement = target;
    //     }
    //   }
    // }

    // Set an initially active link if appropriate.
    // if (isAlreadyActive) {
    //   this.activate(false);
    // }
  }

  // `attributeChangedCallback` processes changes to the `active` attr
  updated(prevProps, prevState) {
    // if (this.isDropdownLink) {
    //   this.shadowLink?.classList.add('is-dropdown-link');
    // } else {
    //   this.shadowLink?.classList.remove('is-dropdown-link');
    // }
  }

  handleClick(event) {
    try {
      if (this.waypointElement) {
        event.preventDefault();

        // Don't add the :focus state to the link in this scenario.  The focus state is about to get removed anyway as
        // we move down the page, and a flash of the focused state just adds confusion.
        document.activeElement.blur();

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

        this.dispatchEvent(
          new CustomEvent('navbar:activate', {
            detail: {
              activeItem: this,
              onClick: true,
            },
            bubbles: true,
          }),
        );
      }
    } catch (err) {
      console.log(err);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback && super.disconnectedCallback();
    this.removeEventListener('click', this.handleClick);
  }

  firstUpdated() {
    super.firstUpdated && super.firstUpdated();

    // `smoothScroll` needs the anchor as its second argument, does not
    // appear to do anything but throws an error if missing
    // https://github.com/cferdinandi/smooth-scroll#animatescroll
    this.shadowLink = this.renderRoot.querySelector('a');
  }

  render() {
    const classes = cx('c-bolt-navbar-item', {
      // [`c-bolt-navbar-item--active`]: this.active,
    });

    return html`
      <a
        class="${classes}"
        href="${ifDefined(this.url ? this.url : undefined)}"
        target="${ifDefined(this.target ? this.target : undefined)}"
        @click="${this.handleClick}"
      >
        ${this.slotify('default')}
      </a>
    `;
  }
}

export { BoltNavbarItem };
