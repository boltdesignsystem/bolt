import { define, hasNativeShadowDomSupport } from '@bolt/core/utils';
import { withLitHtml, html } from '@bolt/core/renderers/renderer-lit-html';

import gumshoe from 'gumshoejs';
import isVisible from 'is-visible';

// const indicatorElement = '.js-bolt-nav-indicator';
const navLinkElement = 'bolt-navlink'; // Custom element
const isActiveClass = 'is-active';

// Listen for smooth scroll events so we can determine whether or not a link was just clicked on vs if the user is scrolling (to change animation behavior)
function logScrollEvent(event) {
  if (event.type === 'scrollStart') {
    window.isScrolling = true;
  } else if (event.type === 'scrollStop' || event.type === 'scrollCancel') {
    window.isScrolling = false;
  }
}

// Listen for smooth-scroll events
document.addEventListener('scrollStart', logScrollEvent, false);
document.addEventListener('scrollStop', logScrollEvent, false);
document.addEventListener('scrollCancel', logScrollEvent, false);

/* From Modernizr */
function whichTransitionEndEvent() {
  var t;
  var el = document.createElement('fakeelement');
  var transitions = {
    transition: 'transitionend',
    OTransition: 'oTransitionEnd',
    MozTransition: 'transitionend',
    WebkitTransition: 'webkitTransitionEnd',
  };

  for (t in transitions) {
    if (el.style[t] !== undefined) {
      return transitions[t];
    }
  }
}

// gumshoeStateModule stores an offset value that persists even when it's called multiple times.  If the offset
// is the same as the last time it was called, it avoids initializing gumshoe again (among other things, when
// initializing multiple navbars on one page, this only initializes gumshoe once).  If the offset value HAS changed--
// presumably because the header has adjusted its own height--gumshoe will be re-initialized with the new value.
let gumshoeStateModule = (function() {
  let offset; // Private variable
  let pub = {}; // public object - returned at end of module to allow external interaction
  let reference;

  // If gumshoe doesn't activate until an anchor link is all the way at the top, if feels late.
  // This offset makes attempts to correct for that perceived bug by activating links a little bit earlier during scroll.
  const gumshoeExtraOffset = 100;

  // navSelectorInstance is used to map up the element calling setOffset so <bolt-nav-indicator> methods can get used
  pub.setOffset = function(newOffset, navSelectorInstance) {
    if (offset !== newOffset) {
      offset = newOffset;

      gumshoe.init({
        selector: 'bolt-nav-indicator a',
        // All the link activation logic is handled in the callback, but gumshoe won't work
        // without a value for activeClass, so we give it a placeholder.
        activeClass: 'has-gumshoe-focus',
        scrollDelay: false,
        offset: parseInt(offset) + gumshoeExtraOffset,
        callback(nav) {
          /**
           * Exit early if nav OR nav.nav (the target) is undefined. Workaround to occasional JS error throwing:
           * `Cannot read property 'nav' of undefined`
           */
          if (nav === undefined) {
            return;
          }

          if (nav.nav === undefined) {
            return;
          }

          // logic once we know we should try to animate in a gumshoe-activated link
          function activateGumshoeLink() {
            const originalTarget = nav.nav;
            let originalTargetHref;
            let normalizedTarget;

            if (originalTarget) {
              originalTargetHref = originalTarget.getAttribute('href');
            } else {
              originalTargetHref = nav.nav.getAttribute('href');
            }

            // Need to target via document vs this custom element reference since only one gumshoe instance is shared across every component instance to better optimize for performance
            const matchedTargetLinks = document.querySelectorAll(
              `bolt-navlink > [href*="${originalTargetHref}"]`,
            );

            for (var i = 0, len = matchedTargetLinks.length; i < len; i++) {
              const linkInstance = matchedTargetLinks[i];

              // Stop if normalizedTarget already set.
              if (normalizedTarget) {
                break;
              }

              // Prefer visible links over hidden links
              if (isVisible(linkInstance)) {
                normalizedTarget = linkInstance;

                // Prefer dropdown links over non-dropdown links if the link is hidden
              } else if (linkInstance.parentNode.isDropdownLink) {
                normalizedTarget = linkInstance;

                // otherwise default to what was originally selected.
              } else if (i === len - 1) {
                normalizedTarget = originalTarget;
              }
            }

            const normalizedParent = normalizedTarget.parentNode;

            normalizedParent.activate();
          }

          // if this there's a <bolt-nav-priority> instance, make sure that component's ready to go before proceeding trying to animate anything.
          if (nav.nav.closest('bolt-nav-priority')) {
            const priorityNav = nav.nav.closest('bolt-nav-priority');
            if (!priorityNav.isReady) {
              document.addEventListener(
                'nav-priority:ready',
                activateGumshoeLink,
              );
            } else {
              activateGumshoeLink();
            }
          } else {
            activateGumshoeLink();
          }
        },
      });
    }
  };

  pub.getOffset = function() {
    return offset;
  };

  return pub;
})();

@define
class BoltNavIndicator extends withLitHtml {
  static is = 'bolt-nav-indicator';

  // Behavior for `<bolt-nav>` parent container
  static get observedAttributes() {
    return ['offset'];
  }

  constructor(self) {
    self = super(self);
    this.activeLink = false;
    this.isAnimating = false;
    this.useShadow = hasNativeShadowDomSupport;

    this.indicatorClass = 'c-bolt-nav-indicator';

    // Ensure that 'this' inside the _onWindowResize event handler refers to <bolt-nav-link>
    // even if the handler is attached to another element (window in this case)
    this._onWindowResize = this._onWindowResize.bind(this);
    return self;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'offset':
        // Note the attributeChangedCallback is only handling the *side effects*
        // of setting the attribute.
        this._initializeGumshoe();
    }
  }

  render() {
    return html`
      ${this.slot('default')}
    `;
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

  /**
   * Automatically tell any nested `<bolt-navlink>` elements to deactivate,
   * optionally skip over the one being activated
   */
  resetLinks(activeLink = null) {
    const links = this._allLinks();
    links.forEach(link => {
      if (link !== activeLink && link.deactivate) {
        link.deactivate();
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
    if (event.detail.isVisible) {
      this._animateIn(event.target);
    } else {
      this._animateOut(event.target);
    }

    this.activeLink = event.target;
    this.resetLinks(this.activeLink);
  }

  _onWindowResize() {
    if (this.activeLink) {
      this._animateIn(this.activeLink);
    }
  }

  // `_animateIn` animates the line for the active link
  _animateIn(link) {
    if (this.isAnimating && window.isScrolling) {
      return;
    }

    if (!this.isAnimating) {
      this.isAnimating = true;
    }

    const linkPos = link.getBoundingClientRect(); // object w/ all positioning
    const linkWidth = linkPos.width;
    const linkHeight = linkPos.height;
    const linkOffsetLeft = link.offsetLeft;
    const linkOffsetTop = link.offsetTop;
    const linkOffsetVertical = linkPos.top + linkHeight / 2;
    const linkOffsetHorizontal = linkOffsetLeft + linkWidth / 2;

    if (link.hasAttribute('is-dropdown-link')) {
      this._indicator.style.opacity = 0;
      return;
    }

    // No link is currently active; the first link to become active is a special snowflake when it comes to animation.
    if (!this.activeLink && isVisible(link)) {
      // First, immediately center the indicator.
      this._indicator.style.transition = 'none';
      this._indicator.style.opacity = 1;
      this._indicator.style.width = linkWidth + 'px';
      this._indicator.style.transform =
        'translateX(' + linkOffsetLeft + 'px) scaleX(0)';

      // Then, reset the transition and expand the indicator to the full width of the link.
      this.flushCss(this._indicator);
      this._indicator.style.transition = '';
      this._indicator.style.opacity = 1;
      this._indicator.style.width = linkWidth + 'px';
      this._indicator.style.transform =
        'translateX(' + linkOffsetLeft + 'px) scaleX(1)';
    } else {
      this._indicator.style.opacity = 1;
      this._indicator.style.width = linkWidth + 'px';
      this._indicator.style.transform =
        'translateX(' + linkOffsetLeft + 'px) scaleX(1)';
    }
  }

  // hide the animated line when the active link can't be seen / is nested in a dropdown
  _animateOut(link) {
    this._indicator.style.opacity = 0;
  }

  _initializeGumshoe() {
    gumshoeStateModule.setOffset(this.offset, this);
  }

  // `<bolt-nav-link>` emits a custom event when the link is active
  connecting() {
    Promise.all([
      customElements.whenDefined('bolt-nav-priority'),
      customElements.whenDefined('bolt-navlink'),
    ]).then(_ => {
      // If the nav indicator already exists, exit early.
      if (this.querySelector(`.${this.indicatorClass}`)) {
        return;
      }

      const indicatorElem = document.createElement('li');
      indicatorElem.classList.add(`${this.indicatorClass}`);

      const indicatorElement = this.querySelector('ul').appendChild(
        indicatorElem,
      );
      this._indicator = indicatorElement;

      // Get the closest navbar component (if it exists) to use as a fallback offset
      const navbarParent = this.closest('bolt-navbar');
      if (navbarParent) {
        this.offsetDefault = navbarParent.offsetHeight;
      }

      this.offset = this.hasAttribute('offset')
        ? this.getAttribute('offset')
        : this.offsetDefault;

      this._initializeGumshoe();
      this._upgradeProperty('offset');

      this.addEventListener('navlink:active', this._onActivateLink);
      window.addEventListener('optimizedResize', this._onWindowResize);
      this.addEventListener(whichTransitionEndEvent(), this._onTransitionEnd);
    });
  }

  _onTransitionEnd() {
    if (this.isAnimating) {
      this.isAnimating = false;
    }
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
    this.removeEventListener('navlink:active', this._onActivateLink);
    window.removeEventListener('optimizedResize', this._onWindowResize);
  }
}

// Create a custom 'optimizedResize' event that works just like window.resize but is more performant because it
// won't fire before a previous event is complete.
// This was adapted from https://developer.mozilla.org/en-US/docs/Web/Events/resize
(function() {
  function throttle(type, name, obj) {
    obj = obj || window;
    let running = false;

    function func() {
      if (running) {
        return;
      }
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
  throttle('resize', 'optimizedResize');
})();

export { BoltNavIndicator };
