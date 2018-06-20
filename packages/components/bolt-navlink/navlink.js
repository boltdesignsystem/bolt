import {
  h,
  render,
  props,
  BoltComponent,
  define,
  css,
  spacingSizes,
  hasNativeShadowDomSupport,
} from '@bolt/core';

import isVisible from 'is-visible';

// Used for attaching smooth scroll behavior to dynamically created <bolt-navlink> instances
import {
  smoothScroll,
  defaultScrollOptions,
  getScrollTarget,
} from '@bolt/components-smooth-scroll';


@define
class BoltNavLink extends BoltComponent() {
  static is = 'bolt-navlink';

  static props = {
    active: props.boolean,
    isDropdownLink: props.boolean,
  }

  constructor(self) {
    self = super(self);
    this.activeClass = 'is-active';
    this.dropdownLinkClass = 'is-dropdown-link';
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
    // prevent browser default if we're smooth scrolling to a navlink. this ensures a smoother, less jumpy animation in browsers (like Safari)
    const customScrollElemTarget = this._shadowLink.getAttribute('href');
    const matchedScrollTarget = document.querySelectorAll(customScrollElemTarget);
    let shouldSmoothScroll = true;

    // if no ids match up with the smooth scrollable element, don't try to smooth scroll.
    // workaround to smooth scroll js error `Cannot read property 'smoothScroll' of null`
    if (customScrollElemTarget.indexOf('#') !== -1 && matchedScrollTarget.length === 0) {
      shouldSmoothScroll = false;
    }

    if (shouldSmoothScroll !== false){
      event.preventDefault();
    }

    // manually add smooth scroll to dropdown links since these are added to the page AFTER smooth scroll event bindings would hae been added.
    if (!this.props.active && this.props.isDropdownLink && shouldSmoothScroll !== false) {
      const scrollTarget = getScrollTarget(this._shadowLink);
      if (scrollTarget) {
        smoothScroll.animateScroll(scrollTarget, this._shadowLink, defaultScrollOptions);
      }
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

  isActive(){
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

    if (emitEvent){
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

  connecting() {
    this.addEventListener('click', this.onClick);

    this._shadowLink = this.querySelector('a');

    const isAlreadyActive = this._shadowLink.classList.contains(this.activeClass) || this._shadowLink.getAttribute('href') === window.location.hash || this.props.active;

    // Set an initially active link if appropriate.
    if (isAlreadyActive) {
      this.activate(false);
    }
  }

  disconnecting() {
    this.removeEventListener('click', this.onClick);
  }
}
