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
import styles from './navlink.scss';
import schema from './navlink.schema';

let cx = classNames.bind(styles);

@customElement('bolt-navlink')
class BoltNavLink extends withContext(BoltElement) {
  static schema = schema;

  static get properties() {
    return {
      ...this.props,
      isDropdownLink: { type: Boolean },
    };
  }

  static useShadow = false;

  constructor() {
    super();
    this.role = 'presentation';

    this.activeClass = 'is-active';
    // this.useShadow = false; // just-in-case workaround given that the current <bolt-navlink> doesn't actually render any HTML...
    this.dropdownLinkClass = 'is-dropdown-link';
  }

  static get styles() {
    return [unsafeCSS(styles)];
  }

  static get observedContexts() {
    return ['activeItem', 'scrollOffsetSelector', 'scrollOffset'];
  }

  contextChangedCallback(name, oldValue, value) {
    if (name === 'activeItem') {
      console.log(value);
      this.active = value === this;
      if (this.active) {
        this.activate(true);
      } else {
        this.deactivate(true);
      }
    } else {
      this[name] = value;
    }
  }

  connectedCallback() {
    // console.log('@connected');
    super.connectedCallback && super.connectedCallback();

    // From TOC
    // if (this.url && this.url.indexOf('#') === 0) {
    //   this.target = document.querySelector(this.url);
    // }

    this.addEventListener('click', this.handleClick);

    this._shadowLink = this.querySelector('a');

    const isAlreadyActive =
      this._shadowLink.classList.contains(this.activeClass) ||
      this._shadowLink.getAttribute('href') === window.location.hash ||
      this.active;

    if (this._shadowLink && !this.target) {
      const href = this._shadowLink.getAttribute('href');
      if (href.indexOf('#') === 0 && href !== '#!') {
        const target = document.querySelector(href);
        if (target) {
          this.target = target;
        }
      }
    }

    // Set an initially active link if appropriate.
    if (isAlreadyActive) {
      this.activate(false);
    }
  }

  // `attributeChangedCallback` processes changes to the `active` attr
  updated(prevProps, prevState) {
    if (this.isDropdownLink) {
      this._shadowLink.classList.add('is-dropdown-link');
    } else {
      this._shadowLink.classList.remove('is-dropdown-link');
    }
  }

  handleClick(event) {
    /**
     * 1. prevent browser default if we're smooth scrolling to a navlink.
     * this ensures a smoother, less jumpy animation in browsers (like Safari)
     */

    try {
      const customScrollElemTarget = this._shadowLink.getAttribute('href');

      if (customScrollElemTarget && customScrollElemTarget.indexOf('#') === 0) {
        const matchedScrollTarget = document.querySelector(
          customScrollElemTarget,
        );

        if (matchedScrollTarget) {
          event.preventDefault();

          // Don't add the :focus state to the link in this scenario.  The focus state is about to get removed anyway as
          // we move down the page, and a flash of the focused state just adds confusion.
          document.activeElement.blur();

          // manually add smooth scroll to dropdown links since these are added to the page AFTER smooth scroll event bindings would hae been added.
          if (!this.active && this.isDropdownLink) {
            const scrollTarget = getScrollTarget(this._shadowLink);
            if (scrollTarget) {
              smoothScroll.animateScroll(
                scrollTarget,
                this._shadowLink,
                scrollOptions,
              );
            }
          }
        }
      }
    } catch (err) {
      console.log(err);
    }

    this.dispatchEvent(
      new CustomEvent('navlink:click', {
        detail: {
          isActiveNow: this.isActive() ? true : false,
          isVisible: isVisible(this) ? true : false,
          isDropdownLink: this.isDropdownLink,
        },
        bubbles: true,
      }),
    );
  }

  isActive() {
    return this.active;
  }

  // get isDropdownLink() {
  //   // return this.isDropdownLink;
  // }

  set isDropdownLink(value) {
    // console.log('@set dl', value);
    // Properties can be set to all kinds of string values. This makes sure
    // it’s converted to a proper boolean value using JavaScript’s truthiness
    // & falsiness principles.
    value = Boolean(value);
    if (value) {
      this.setAttribute('is-dropdown-link', '');
    } else {
      this.removeAttribute('is-dropdown-link');
    }
  }

  activate(emitEvent = true) {
    this._shadowLink.classList.add(this.activeClass);
    this.setAttribute('active', '');
    this.active = true;

    if (emitEvent) {
      this.dispatchEvent(
        new CustomEvent('navlink:active', {
          detail: {
            isActiveNow: this.isActive() ? true : false,
            isVisible: isVisible(this) ? true : false,
            isDropdownLink: this.isDropdownLink,
          },
          bubbles: true,
        }),
      );
    }
  }

  deactivate() {
    this.removeAttribute('active');
    this.active = false;
    this._shadowLink.classList.remove(this.activeClass);
  }

  disconnectedCallback() {
    super.disconnectedCallback && super.disconnectedCallback();
    this.removeEventListener('click', this.handleClick);
  }
}

export { BoltNavLink };
