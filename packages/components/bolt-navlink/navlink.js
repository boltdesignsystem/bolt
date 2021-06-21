import { html, customElement } from '@bolt/element';
import { props } from '@bolt/core-v3.x/utils';
import { withLitHtml } from '@bolt/core-v3.x/renderers/renderer-lit-html';
import isVisible from 'is-visible';

// Used for attaching smooth scroll behavior to dynamically created <bolt-navlink> instances
import {
  smoothScroll,
  scrollOptions,
  getScrollTarget,
} from '@bolt/components-smooth-scroll/src/smooth-scroll';

@customElement('bolt-navlink')
class BoltNavLink extends withLitHtml {
  static props = {
    active: props.boolean,
    isDropdownLink: props.boolean,
  };

  constructor(self) {
    self = super(self);
    self.activeClass = 'is-active';
    self.useShadow = false; // just-in-case workaround given that the current <bolt-navlink> doesn't actually render any HTML...
    self.dropdownLinkClass = 'is-dropdown-link';
    return self;
  }

  // `attributeChangedCallback` processes changes to the `active` attr
  updated(prevProps, prevState) {
    if (this.props.isDropdownLink) {
      this._shadowLink.classList.add('is-dropdown-link');
    } else {
      this._shadowLink.classList.remove('is-dropdown-link');
    }
  }

  onClick(event) {
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
          if (!this.props.active && this.props.isDropdownLink) {
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
          isDropdownLink: this.props.isDropdownLink,
        },
        bubbles: true,
      }),
    );
  }

  isActive() {
    return this.props.active;
  }

  get isDropdownLink() {
    return this.props.isDropdownLink;
  }

  set isDropdownLink(value) {
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
    this.props.active = true;

    if (emitEvent) {
      this.dispatchEvent(
        new CustomEvent('navlink:active', {
          detail: {
            isActiveNow: this.isActive() ? true : false,
            isVisible: isVisible(this) ? true : false,
            isDropdownLink: this.props.isDropdownLink,
          },
          bubbles: true,
        }),
      );
    }
  }

  deactivate() {
    this.removeAttribute('active');
    this.props.active = false;
    this._shadowLink.classList.remove(this.activeClass);
  }

  connectedCallback() {
    super.connectedCallback && super.connectedCallback();
    this.addEventListener('click', this.onClick);

    this._shadowLink = this.querySelector('a');

    const isAlreadyActive =
      this._shadowLink.classList.contains(this.activeClass) ||
      this._shadowLink.getAttribute('href') === window.location.hash ||
      this.props.active;

    // Set an initially active link if appropriate.
    if (isAlreadyActive) {
      this.activate(false);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback && super.disconnectedCallback();
    this.removeEventListener('click', this.onClick);
  }
}

export { BoltNavLink };
