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
import isVisible from 'is-visible';

// const indicatorElement = '.js-bolt-nav-indicator';
const navLinkElement = 'bolt-navlink'; // Custom element
const isActiveClass = 'is-active';

// Listen for smooth scroll events so we can determine whether or not a link was just clicked on vs if the user is scrolling (to change animation behavior)
function logScrollEvent(event) {
  if (event.type === 'scrollStart'){
    window.isScrolling = true;
  } else if (event.type === 'scrollStop' || event.type === 'scrollCancel') {
    window.isScrolling = false;
  }
}

// Listen for smooth-scroll events
document.addEventListener('scrollStart', logScrollEvent, false);
document.addEventListener('scrollStop', logScrollEvent, false);
document.addEventListener('scrollCancel', logScrollEvent, false);


// gumshoeStateModule stores an offset value that persists even when it's called multiple times.  If the offset
// is the same as the last time it was called, it avoids initializing gumshoe again (among other things, when
// initializing multiple navbars on one page, this only initializes gumshoe once).  If the offset value HAS changed--
// presumably because the header has adjusted its own height--gumshoe will be re-initialized with the new value.




@define
export class BoltNavIndicator extends BoltComponent() {
  static is = 'bolt-nav-indicator';

  // Behavior for `<bolt-nav>` parent container
  static get observedAttributes() { return ['offset']; }

  constructor(self) {
    self = super(self);
    this.activeLink = false;
    this.smoothScrolling = false;
    this.useShadow = hasNativeShadowDomSupport;

    // Ensure that 'this' inside the _onWindowResize event handler refers to <bolt-nav-link>
    // even if the handler is attached to another element (window in this case)
    this._onWindowResize = this._onWindowResize.bind(this);
    return self;
  }

  initGumshoeModule() {
    this.offset; // Private variable
    this.pub = {}; // public object - returned at end of module to allow external interaction
    let oldElement;
    let newElement;

    this.pub.setOffset = function (newOffset) {
      if (this.offset !== newOffset) {
        this.offset = newOffset;

        gumshoe.init({
          selector: 'bolt-nav-indicator a',
          // All the link activation logic is handled in the callback, but gumshoe won't work without
          // a value for activeClass, so we give it a placeholder.
          activeClass: 'gumshoe',
          // Setting scrollDelay to true prevents gumshoe from trying to set the active item when a link
          // has been clicked and WHILE we are smooth scrolling to that item.  This could be removed if
          // we could find a way to disable any activity in the callback while a non-gumshoe (i.e. click-initiated)
          // animation is in-progress.
          scrollDelay: false,
          offset: this.offset,
          callback(element) {
            if (window.isScrolling === false || window.isScrolling === undefined) {

              console.log(window.isScrolling);

              newElement = element.nav;

              if (oldElement !== newElement) {
                if (oldElement === undefined) {
                  oldElement === newElement;
                }

                const navlinkElement = element.nav.closest('bolt-navlink');

                const parentElement = element.nav.closest('bolt-nav-indicator');
                const childrenLinks = parentElement.querySelectorAll('bolt-navlink');

                childrenLinks.forEach(item => {
                  const itemHref = item.querySelector('a').getAttribute('href');

                  if (item === navlinkElement || itemHref === element.nav.getAttribute('href')) {

                    // Don't re-assign active attribute if already active
                    if (!item.hasAttribute('active')){
                      item.setAttribute('active', '');
                    }

                  } else {

                    if (item.hasAttribute('active')) {
                      item.removeAttribute('active');
                    }

                  }
                });
              }





            }
          },
        });
      }
    };

    this.pub.getOffset = function () {
      return this.offset;
    };

    return this.pub;
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
    console.log(event);

    // this.resetLinks(event.target); //Reset nested children, skipping over active link


    // Animate out hidden links, animate in visible links
    if (event.detail.isVisible !== false && event.detail.isDropdownLink === false) {
      this._animateIn(event.target);
    }

    // this.activeLink = event.target;
    // else {
    //   this._animateOut(event.target);
    // }
  }

  _onWindowResize() {
    if (this.activeLink) {
      this._animateIn(this.activeLink);
    }
  }

  // `_animateIn` animates the line for the active link
  _animateIn(link) {

    const linkPos = link.getBoundingClientRect(); // object w/ all positioning
    const linkWidth = linkPos.width;
    const linkHeight = linkPos.height;
    const linkOffsetLeft = link.offsetLeft;
    const linkOffsetTop = link.offsetTop;
    const linkOffsetVertical = linkPos.top + linkHeight / 2;
    const linkOffsetHorizontal = linkOffsetLeft + linkWidth / 2;
    const mq = window.matchMedia('(max-width: 600px)');

    if (linkWidth === 0 || !isVisible(link)) {
      this._indicator.style.opacity = 0;
      return;
    }

    if (!this.activeLink) {
      // No link is currently active; the first link to become active is a special snowflake when it
      // comes to animation.

      // First, immediately center the indicator.
      this._indicator.style.transition = 'none';
      this._indicator.style.opacity = 1;


      if (mq.matches) {
        this._indicator.style.setProperty('--bolt-nav-indicator-transform', linkOffsetVertical + 'px');

      } else {
        this._indicator.style.transform = 'translateX(' + linkOffsetHorizontal + 'px) scaleX(1)';
      }

      // Then, reset the transition and expand the indicator to the full width of the link.
      this.flushCss(this._indicator);
      this._indicator.style.transition = '';


      if (mq.matches) {
        this._indicator.style.opacity = 1;
        this._indicator.style.height = linkHeight + 'px';
        this._indicator.style.width = '2px';
        // this._indicator.style.transform = 'translateY(' + linkOffsetTop + 'px)';
        this._indicator.style.setProperty('--bolt-nav-indicator-transform', linkOffsetTop + 'px');

      } else {
        this._indicator.style.opacity = 1;
        this._indicator.style.width = linkWidth + 'px';
        this._indicator.style.transform = 'translateX(' + linkOffsetLeft + 'px) scaleX(1)';
      }


    } else {
      // console.log(isVisible(this.activeLink));
      if (mq.matches) {
        this._indicator.style.opacity = 1;
        this._indicator.style.height = linkHeight + 'px';
        this._indicator.style.width = '2px';
        this._indicator.style.setProperty('--bolt-nav-indicator-transform', linkOffsetTop + 'px');
        // this._indicator.style.transform = 'translateY(' + linkOffsetTop + 'px)';
        // this._indicator.style['--bolt-nav-indicator-transform-fallback'] = 'translateY(' + linkOffsetTop + 'px)';
      } else {
        this._indicator.style.opacity = 1;
        this._indicator.style.width = linkWidth + 'px';
        this._indicator.style.transform = 'translateX(' + linkOffsetLeft + 'px) scaleX(1)';
      }
    }
  }



  // `_animateIn` animates the line for the active link
  _animateOut(link) {
    console.log('_animateOut');
    console.log(link);
    this._indicator.style.opacity = 0;

    // const linkPos = link.getBoundingClientRect(); // object w/ all positioning
    // const linkWidth = linkPos.width;
    // const linkHeight = linkPos.height;
    // const linkOffsetLeft = link.offsetLeft;
    // const linkOffsetTop = link.offsetTop;
    // const linkOffsetVertical = linkPos.top + linkHeight / 2;
    // const linkOffsetHorizontal = linkOffsetLeft + linkWidth / 2;
    // const mq = window.matchMedia('(max-width: 600px)');

    // console.log(linkPos);
    // console.log(isVisible(link));

    // if (linkWidth === 0) {
    //   this._indicator.style.opacity = 0;
    //   return;
    // }

    // if (!this.activeLink) {
    //   // No link is currently active; the first link to become active is a special snowflake when it
    //   // comes to animation.

    //   // First, immediately center the indicator.
    //   this._indicator.style.transition = 'none';
    //   this._indicator.style.opacity = 1;


    //   if (mq.matches) {
    //     this._indicator.style.setProperty('--bolt-nav-indicator-transform', linkOffsetVertical + 'px');

    //   } else {
    //     this._indicator.style.transform = 'translateX(' + linkOffsetHorizontal + 'px)';
    //   }

    //   // Then, reset the transition and expand the indicator to the full width of the link.
    //   this.flushCss(this._indicator);
    //   this._indicator.style.transition = '';


    //   if (mq.matches) {
    //     this._indicator.style.height = linkHeight + 'px';
    //     this._indicator.style.width = '2px';
    //     // this._indicator.style.transform = 'translateY(' + linkOffsetTop + 'px)';
    //     this._indicator.style.setProperty('--bolt-nav-indicator-transform', linkOffsetTop + 'px');

    //   } else {
    //     this._indicator.style.width = linkWidth + 'px';
    //     this._indicator.style.transform = 'translateX(' + linkOffsetLeft + 'px)';
    //   }


    // } else {
    //   // console.log(isVisible(this.activeLink));
    //   if (mq.matches) {
    //     this._indicator.style.opacity = 1;
    //     this._indicator.style.height = linkHeight + 'px';
    //     this._indicator.style.width = '2px';
    //     this._indicator.style.setProperty('--bolt-nav-indicator-transform', linkOffsetTop + 'px');
    //     // this._indicator.style.transform = 'translateY(' + linkOffsetTop + 'px)';
    //     // this._indicator.style['--bolt-nav-indicator-transform-fallback'] = 'translateY(' + linkOffsetTop + 'px)';
    //   } else {
    //     this._indicator.style.opacity = 1;
    //     this._indicator.style.width = linkWidth + 'px';
    //     this._indicator.style.transform = 'translateX(' + linkOffsetLeft + 'px)';
    //   }
    // }
  }




  _initializeGumshoe() {
    this.gumshoeStateModule = this.initGumshoeModule();
    this.gumshoeStateModule.setOffset(this.offset);
  }

  // `<bolt-nav-link>` emits a custom event when the link is active
  connecting() {
    Promise.all([
      customElements.whenDefined('bolt-priority-nav'),
    ]).then(_ => {
    // this._indicator = this.querySelector(indicatorElement);
      const indicatorElem = document.createElement('li');
      indicatorElem.classList.add('c-bolt-nav-indicator');

      const indicatorElement = this.querySelector('ul').appendChild(indicatorElem);
      this._indicator = indicatorElement;


      this.addEventListener('activateLink', this._onActivateLink);

      window.addEventListener('optimizedResize', this._onWindowResize);

      // Initialize the Gumshoe library.
      this.offset = this.hasAttribute('offset') ? this.getAttribute('offset') : 50;
      this._initializeGumshoe();

      this._upgradeProperty('offset');

    });
  }

  scrollStart(){
    this.smoothScrolling = true;
  }

  scrollStop() {
    this.smoothScrolling = false;
  }

  scrollCancel() {
    this.smoothScrolling = false;
  }

  // logScrollEvent(event) {
  //   // The event type
  //   console.log('type:', event.type);

  //   // The anchor element being scrolled to
  //   console.log('anchor:', event.detail.anchor);

  //   // The anchor link that triggered the scroll
  //   console.log('toggle:', event.detail.toggle);
  // }

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

