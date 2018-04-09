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

const isActiveClass = 'is-active';


@define
class BoltNavLink extends BoltComponent() {
  static is = 'bolt-navlink';

  // The element reacts to changes to the `active` attribute.
  static get observedAttributes() {
    return ['active'];
  }

  constructor() {
    super();

    this._shadowLink = this.querySelector('a');
  }

  // Returns whether or not the current `<bolt-navlink>` element has been active.
  get active() {
    return this.hasAttribute('active');
  }

  // Sets the `active` state for the current custom element
  set active(value) {
    /* Properties can be set to all kinds of string values. This
     * makes sure it’s converted to a proper boolean value using
     * JavaScript’s truthiness & falsiness principles.
     */

    value = Boolean(value);
    if (value) {
      this.setAttribute('active', '');
    } else {
      this.removeAttribute('active');
    }
  }


  // `attributeChangedCallback` processes changes to the `active` attr
  attributeChangedCallback(name, oldVal, newVal) {
    switch (name) {
      case 'active':
        if (this.active) {
          this._shadowLink.classList.add(isActiveClass);

          // Dispatch an event that signals to the parent what element is being active
          this.dispatchEvent(
            new CustomEvent('activateLink', {
              detail: {
                isActiveNow: true,
              },
              bubbles: true,
            }),
          );
        }
        else {
          this._shadowLink.classList.remove(isActiveClass);
        }
    }
  }

  onClick() {
    if (!this.active) {
      this.active = true;
    }
  }

  render() {
    return this.html`
      ${this.slot('default')}
    `
  }

  connecting() {
    this.addEventListener('click', this.onClick);

    // Set an initially active link if appropriate.
    const isAlreadyActive = this._shadowLink.classList.contains(isActiveClass) || this._shadowLink.getAttribute('href') === window.location.hash;

    if (isAlreadyActive) {
      this.active = true;
    }

    this._upgradeProperty('active');
  }

  // See https://developers.google.com/web/fundamentals/web-components/best-practices#lazy-properties
  // for an explanation of lazy properties.
  _upgradeProperty(prop) {
    if (this.hasOwnProperty(prop)) {
      let value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }

  disconnecting() {
    this.removeEventListener('click', this.onClick);
  }
}
