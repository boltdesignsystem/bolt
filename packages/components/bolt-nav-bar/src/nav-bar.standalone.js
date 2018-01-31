import {
  h,
  render,
  define,
  props,
  withComponent,
  withPreact,
  css,
  spacingSizes
} from '@bolt/core';

const indicatorElement = '.js-bolt-nav-indicator';
const navLinkElement = 'bolt-nav-link'; // Custom element
const isActiveClass = 'is-active';

// Behavior for `<bolt-nav-list>` parent container
class BoltNavList extends withComponent(withPreact()) {
  constructor() {
    super();
    this.activeLink = false;

    // Ensure that 'this' inside the _onWindowResize event handler refers to <bolt-nav-link>
    // even if the handler is attached to another element (window in this case)
    this._onWindowResize = this._onWindowResize.bind(this);
  }

  renderCallback() {
    return (
      <slot />
    )
  }

  /**
   * Automatically tell nested `<bolt-nav-link>` elems to de-select, optionally skip over the
   * one being activated.
   */
  resetLinks(activeLink = null) {
    const links = this._allLinks();
    links.forEach(link => {
      if (link !== activeLink) {
        link.active = false
      }
    });
  }

  // flushCss() is used to make sure the previous CSS alterations are complete before continuing.
  // See https://stackoverflow.com/questions/34726154/temporarily-bypass-a-css-transition/34726346
  flushCss(element) {
    // By reading the offsetHeight property, we are forcing
    // the browser to flush the pending CSS changes (which it
    // does to ensure the value obtained is accurate).
    element.offsetHeight;
  }

  // Return all the nested nav-link children for manually resetting at the parent-level
  _allLinks() {
    return Array.from(this.querySelectorAll(navLinkElement));
  }

  // `_onActiveLink` handles the `activateLink` event emitted by the children
  _onActivateLink(event) {
    this.resetLinks(event.target); //Reset nested children, skipping over active link
    this._animateIndicatorLine(event.target);

    this.activeLink = event.target;
  }

  _onWindowResize() {
    if (this.activeLink) {
      this._animateIndicatorLine(this.activeLink);
    }
  }

  // `_animateIndicatorLine` animates the line for the active link
  _animateIndicatorLine(link) {

    const linkPos = link.getBoundingClientRect(); // object w/ all positioning
    const linkWidth = linkPos.width;
    const linkOffsetLeft = link.offsetLeft;
    const linkOffsetCenter = linkOffsetLeft + linkWidth / 2;

    if (!this.activeLink) {
      // No link is currently active; the first link to become active is a special snowflake when it
      // comes to animation.

      // First, immediately center the indicator.
      this._indicator.style.transition = 'none';
      this._indicator.style.transform = 'translateX(' + linkOffsetCenter + 'px)';

      // Then, reset the transition and expand the indicator to the full width of the link.
      this.flushCss(this._indicator);
      this._indicator.style.transition = '';
      this._indicator.style.width = linkWidth + 'px';
      this._indicator.style.transform = 'translateX(' + linkOffsetLeft + 'px)';
    } else {
      this._indicator.style.width = linkWidth + 'px';
      this._indicator.style.transform = 'translateX(' + linkOffsetLeft + 'px)';
    }
  }

  // `<bolt-nav-link>` emits a custom event when the link is active
  connectedCallback() {
    this._indicator = this.querySelector(indicatorElement);
    this.addEventListener('activateLink', this._onActivateLink);
    window.addEventListener('optimizedResize', this._onWindowResize);
  }

  // Clean up event listeners when being removed from the page
  disconnectedCallback() {
    this.removeEventListener('activateLink', this._onActivateLink);
    window.removeEventListener('optimizedResize', this._onWindowResize);
  }
}
customElements.define('bolt-nav-list', BoltNavList);




// Behavior for `<bolt-nav-link>` children
class BoltNavLink extends withComponent(withPreact()) {
  // The element reacts to changes to the `active` attribute.
  static get observedAttributes() {
    return ['active'];
  }

  constructor() {
    super();

    this._shadowLink = this.querySelector('a');
  }

  // Returns whether or not the current `<bolt-nav-link>` element has been active.
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
      this._shadowLink.classList.add(isActiveClass);
    } else {
      this.removeAttribute('active');
      this._shadowLink.classList.remove(isActiveClass);
    }
  }


  // `attributeChangedCallback` processes changes to the `active` attr
  attributeChangedCallback(attrName, oldVal, newVal) {
    const value = this.hasAttribute('active');
  }

  // Handle state changes when being clicked on + emmitting this change as a CustomEvent
  activateLink() {
    if (!this.active){
      this.active = !this.active; // Flip the current active state

      // Dispatch an event that signals to the parent what element is being active
      this.dispatchEvent(
        new CustomEvent('activateLink', {
          detail: {
            isActiveNow: this.active
          },
          bubbles: true,
        })
      );
    }
  }

  renderCallback() {
    return (
      <slot />
    )
  }

  connectedCallback() {
    this.addEventListener('click', this.activateLink);

    // Set an initially active link if appropriate.
    const isAlreadyActive = this._shadowLink.classList.contains(isActiveClass) || this._shadowLink.getAttribute('href') === window.location.hash;

    if (isAlreadyActive) {
      this.activateLink();
    }
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.activateLink);
  }
}
customElements.define('bolt-nav-link', BoltNavLink);




// Create a custom 'optimizedResize' event that works just like window.resize but is more performant because it
// won't fire before a previous event is complete.
// This was adapted from https://developer.mozilla.org/en-US/docs/Web/Events/resize
(function() {
  function throttle(type, name, obj) {
    obj = obj || window;
    let running = false;

    function func() {
      if (running) { return; }
      running = true;
      requestAnimationFrame(function() {
        obj.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    }
    obj.addEventListener(type, func);
  }

  // Initialize on window.resize event.  Note that throttle can also be initialized on any type of event,
  // such as scroll.
  throttle("resize", "optimizedResize");
})();
