import {
  h,
  render,
  define,
  props,
  BoltComponent,
  css,
  spacingSizes,
  hasNativeShadowDomSupport,
} from '@bolt/core';

import gumshoe from 'gumshoejs';

const indicatorElement = '.js-bolt-nav-indicator';
const navLinkElement = 'bolt-navlink'; // Custom element
const isActiveClass = 'is-active';

// gumshoeStateModule stores an offset value that persists even when it's called multiple times.  If the offset
// is the same as the last time it was called, it avoids initializing gumshoe again (among other things, when
// initializing multiple navbars on one page, this only initializes gumshoe once).  If the offset value HAS changed--
// presumably because the header has adjusted its own height--gumshoe will be re-initialized with the new value.
let gumshoeStateModule = (function () {
  let offset; // Private variable
  let pub = {}; // public object - returned at end of module to allow external interaction

  pub.setOffset = function (newOffset) {
    if (offset !== newOffset) {
      offset = newOffset;

      gumshoe.init({
        selector: '.js-bolt-nav-gumshoe a',
        // All the link activation logic is handled in the callback, but gumshoe won't work without
        // a value for activeClass, so we give it a placeholder.
        activeClass: 'gumshoe',
        // Setting scrollDelay to true prevents gumshoe from trying to set the active item when a link
        // has been clicked and WHILE we are smooth scrolling to that item.  This could be removed if
        // we could find a way to disable any activity in the callback while a non-gumshoe (i.e. click-initiated)
        // animation is in-progress.
        scrollDelay: true,
        offset,
        callback (nav) {
          if (nav && nav.hasOwnProperty('nav')) {
            if (!nav.nav.classList.contains(isActiveClass)) {
              // If the parent already has the is-active class, it was activated by something other
              // than gumshoe-- no need to duplicate effort, so abort.
              nav.nav.parentElement.setAttribute('active', '');
            }
          }
        },
      });
    }
  };

  pub.getOffset = function () {
    return offset;
  };

  return pub;
}());


@define
export class BoltNav extends BoltComponent() {
  static is = 'bolt-nav';

  // Behavior for `<bolt-nav>` parent container
  static get observedAttributes() { return ['offset']; }

  constructor() {
    super();
    this.activeLink = false;
    this.useShadow = hasNativeShadowDomSupport;

    // Ensure that 'this' inside the _onWindowResize event handler refers to <bolt-nav-link>
    // even if the handler is attached to another element (window in this case)
    this._onWindowResize = this._onWindowResize.bind(this);
  }

  render() {
    return this.html`
      ${this.slot('default')}
    `
  }

  get offset() {
    return this.getAttribute('offset');
  }

  set offset(value) {
    // Reflect the value of the offset property as an HTML attribute.
    if (value) {
      this.setAttribute('offset', value);
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'offset':
        // Note the attributeChangedCallback is only handling the *side effects*
        // of setting the attribute.
        this._initializeGumshoe();
    }
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
    const linkHeight = linkPos.height;
    const linkOffsetLeft = link.offsetLeft;
    const linkOffsetTop = link.offsetTop;
    const linkOffsetVertical = linkPos.top + linkHeight / 2;
    const linkOffsetHorizontal = linkOffsetLeft + linkWidth / 2;
    const mq = window.matchMedia('(max-width: 600px)');


    if (!this.activeLink) {
      // No link is currently active; the first link to become active is a special snowflake when it
      // comes to animation.

      // First, immediately center the indicator.
      this._indicator.style.transition = 'none';


      if (mq.matches){
        this._indicator.style.setProperty('--bolt-nav-indicator-transform', linkOffsetVertical + 'px');

      } else {
        this._indicator.style.transform = 'translateX(' + linkOffsetHorizontal + 'px)';
      }

      // Then, reset the transition and expand the indicator to the full width of the link.
      this.flushCss(this._indicator);
      this._indicator.style.transition = '';


      if (mq.matches) {
        this._indicator.style.height = linkHeight + 'px';
        this._indicator.style.width = '2px';
        // this._indicator.style.transform = 'translateY(' + linkOffsetTop + 'px)';
        this._indicator.style.setProperty('--bolt-nav-indicator-transform', linkOffsetTop + 'px');

      } else {
        this._indicator.style.width = linkWidth + 'px';
        this._indicator.style.transform = 'translateX(' + linkOffsetLeft + 'px)';
      }


    } else {
      if (mq.matches) {
        this._indicator.style.height = linkHeight + 'px';
        this._indicator.style.setProperty('--bolt-nav-indicator-transform', linkOffsetTop + 'px');
        // this._indicator.style.transform = 'translateY(' + linkOffsetTop + 'px)';
        // this._indicator.style['--bolt-nav-indicator-transform-fallback'] = 'translateY(' + linkOffsetTop + 'px)';
      } else {
        this._indicator.style.width = linkWidth + 'px';
        this._indicator.style.transform = 'translateX(' + linkOffsetLeft + 'px)';
      }
    }
  }

  _initializeGumshoe() {
    gumshoeStateModule.setOffset(this.offset);
  }

  // `<bolt-nav-link>` emits a custom event when the link is active
  connecting() {
    Promise.all([
      customElements.whenDefined('bolt-navlink'),
    ]).then(_ => {
      this._indicator = this.querySelector(indicatorElement);
      this.addEventListener('activateLink', this._onActivateLink);
      window.addEventListener('optimizedResize', this._onWindowResize);

      // Initialize the Gumshoe library.
      this.offset = this.hasAttribute('offset') ? this.getAttribute('offset') : 50;
      this._initializeGumshoe();

      this._upgradeProperty('offset');
    });
  }

  _upgradeProperty(prop) {
    if (this.hasOwnProperty(prop)) {
      let value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }

  // Clean up event listeners when being removed from the page
  disconnecting() {
    this.removeEventListener('activateLink', this._onActivateLink);
    window.removeEventListener('optimizedResize', this._onWindowResize);
  }
}


// Create a custom 'optimizedResize' event that works just like window.resize but is more performant because it
// won't fire before a previous event is complete.
// This was adapted from https://developer.mozilla.org/en-US/docs/Web/Events/resize
(function () {
  function throttle(type, name, obj) {
    obj = obj || window;
    let running = false;

    function func() {
      if (running) { return; }
      running = true;
      requestAnimationFrame(function () {
        obj.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    }
    obj.addEventListener(type, func);
  }

  // Initialize on window.resize event.  Note that throttle can also be initialized on any type of event,
  // such as scroll.
  throttle('resize', 'optimizedResize');
})();
