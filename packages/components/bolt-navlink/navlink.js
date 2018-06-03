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

  onClick() {
    if (!this.props.active) {
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
