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


/* From Modernizr */
function whichTransitionEndEvent() {
  var t;
  var el = document.createElement('fakeelement');
  var transitions = {
    'transition': 'transitionend',
    'OTransition': 'oTransitionEnd',
    'MozTransition': 'transitionend',
    'WebkitTransition': 'webkitTransitionEnd',
  }

  for (t in transitions) {
    if (el.style[t] !== undefined) {
      return transitions[t];
    }
  }
}

function whichTransitionStartEvent() {
  var t;
  var el = document.createElement('fakeelement');
  var transitions = {
    'transition': 'transitionstart',
    'OTransition': 'oTransitionStart',
    'MozTransition': 'transitionstart',
    'WebkitTransition': 'webkitTransitionStart',
  }

  for (t in transitions) {
    if (el.style[t] !== undefined) {
      return transitions[t];
    }
  }
}


@define
export class BoltNavIndicator extends BoltComponent() {
  static is = 'bolt-nav-indicator';

  // Behavior for `<bolt-nav>` parent container
  static get observedAttributes() { return ['offset']; }

  constructor(self) {
    self = super(self);
    this.activeLink = false;
    this.lastActiveLink = null;
    this.transitionStartEvent = whichTransitionStartEvent();
    this.transitionEndEvent = whichTransitionEndEvent();

    this.smoothScrolling = false;
    this.useShadow = hasNativeShadowDomSupport;

    // Ensure that 'this' inside the _onWindowResize event handler refers to <bolt-nav-link>
    // even if the handler is attached to another element (window in this case)
    this._onWindowResize = this._onWindowResize.bind(this);
    return self;
  }

  static initGumshoeModule(element) {
    const navSelectorInstance = element;

    if (this.gumshoeInstance) {
      return this.gumshoeInstance;
    } else {
      console.log('initGumshoeModule');
      this.offset; // Private variable
      this.gumshoeInstance = {}; // public object - returned at end of module to allow external interaction
      let oldElement;
      let newElement;

      this.gumshoeInstance.setOffset = function (newOffset) {
        if (this.offset !== newOffset) {
          this.offset = newOffset;

          gumshoe.init({
            selector: 'bolt-nav-indicator a',
            // All the link activation logic is handled in the callback, but gumshoe won't work without
            // a value for activeClass, so we give it a placeholder.
            activeClass: 'has-gumshoe-focus',
            // Setting scrollDelay to true prevents gumshoe from trying to set the active item when a link
            // has been clicked and WHILE we are smooth scrolling to that item.  This could be removed if
            // we could find a way to disable any activity in the callback while a non-gumshoe (i.e. click-initiated)
            // animation is in-progress.
            scrollDelay: false,
            offset: this.offset,
            callback(nav) {
              // if (window.isScrolling === false || window.isScrolling === undefined) {
              // if (nav && nav.hasOwnProperty('nav')) {
              //   if (!nav.nav.classList.contains(isActiveClass)) {
              //     // If the parent already has the is-active class, it was activated by something other
              //     // than gumshoe-- no need to duplicate effort, so abort.
              //     nav.nav.parentElement.setAttribute('active', '');
              //   }
              // }
              // newElement = nav.nav;

              // if (oldElement !== newElement) {
              // if (oldElement === undefined) {
              //   oldElement === newElement;
              // }
              // console.log(navSelectorInstance);
              // const indicatorElement = navSelectorInstance;
              let normalizedTarget;
              const originalTarget = document.querySelector('.has-gumshoe-focus');
              const originalTargetHref = originalTarget.getAttribute('href');

              // Need to target via document vs this custom element reference since only one gumshoe instance is shared across every component instance to better optimize for performance
              const matchedTargetLinks = document.querySelectorAll(`bolt-navlink > [href*="${originalTargetHref}"]`);

              for (var i = 0, len = matchedTargetLinks.length; i < len; i++) {
                const linkInstance = matchedTargetLinks[i];

                // Stop if normalizedTarget already set.
                if (normalizedTarget){
                  break;
                }

                // Prefer visible links over hidden links
                if (isVisible(linkInstance)){
                  normalizedTarget = linkInstance;

                // If a better match hasn't been found by this point, use the last element in the array.
                } else if (i === len - 1){
                  normalizedTarget = linkInstance;
                }
                // else {
                //   normalizedTarget = originalTarget;
                // }
              }

              const normalizedParent = normalizedTarget.parentNode;

              // console.log(normalizedParent);

              navSelectorInstance.resetLinks(normalizedParent);
              normalizedParent.activate();

              // matchedTargetLinks.some(function (value, index, _arr) {
              //   console.log(index + ": " + value);


              //   // return value === "Pokhara";
              // });
              // const originalTargetParent = navlinkElement.parentNode;
              // console.log(navlinkElementHref);
              // matchedTargetLinks.



              // const allLinkElements = navSelectorInstance.querySelectorAll('bolt-navlink');


              // console.log(matchedTargetLinks);



              // navlinkParent.activate();
              // // ('active', true);
              // navSelectorInstance.resetLinks(navlinkParent);

              // console.log(navlinkElement);
              // console.log();
              // console.log(allLinks);




              // closest('bolt-navlink');

              // const parentElement = nav.nav.closest('bolt-nav-indicator');
              // const childrenLinks = parentElement.querySelectorAll('bolt-navlink');


              // console.log(navSelectorInstance.querySelector(navlinkElement));
              // console.log(navlinkElement);
              // console.log(isVisible(navlinkElement));
              // console.log(navlinkElement.hasAttribute('is-dropdown-link'));
              // console.log();



              // console.log(navlinkElement.hasAttribute('is-dropdown-link'));
              // document.querySelector('gumshoe');
              // console.log(navlinkElement);

              // console.log()
              // const navSelectorInstance =
              // this._shadowLink.getAttribute('href') === window.location.hash




              // childrenLinks.forEach(item => {
              //   const itemHref = item.querySelector('a').getAttribute('href');

              //   if (item === navlinkElement || itemHref === nav.nav.getAttribute('href')) {

              //     // Don't re-assign active attribute if already active
              //     if (!item.hasAttribute('active')) {
              //       item.setAttribute('active', '');
              //     }
              //   }
              //   // else {

              //   //   if (item.hasAttribute('active')) {
              //   //     item.removeAttribute('active');
              //   //   }

              //   // }
              // });


              // }
              // }
              // }
            },

            // callback(element) {
            //   if (window.isScrolling === false || window.isScrolling === undefined) {

            //     console.log(window.isScrolling);







            //   }
            // },
          });
        }
      };

      this.gumshoeInstance.getOffset = function () {
        return this.offset;
      };

      return this.gumshoeInstance;
    }
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

  // attributeChangedCallback(name, oldValue, newValue) {
  //   switch (name) {
  //     case 'offset':
  //       // Note the attributeChangedCallback is only handling the *side effects*
  //       // of setting the attribute.
  //       this._initializeGumshoe();
  //   }
  // }

  /**
   * Automatically tell nested `<bolt-nav-link>` elems to de-select, optionally skip over the
   * one being activated.
   */
  resetLinks(activeLink = null) {
    const links = this._allLinks();
    links.forEach(link => {
      if (link !== activeLink) {
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
    const element = this;

    console.log('_onActivateLink');

    // console.log(element);
    // ok - the event is coming from a dropdown link. Let's confirm this link isn't a clone of an already visible link
    // before assuming we need to animate out the indicator
    // if (event.detail.isDropdownLink){
    //   const targetHref = event.target.querySelector('a').getAttribute('href');

    //   const hrefMatches = element.querySelectorAll(`[href*="${targetHref}"]`);

    //   console.log(hrefMatches);

    //   hrefMatches.some(function (value, index, _arr) {
    //     console.log(index + ": " + value);


    //     // return value === "Pokhara";
    //   });

    //   // console.log();
    // }


    // console.log(event.detail.isDropdownLink);
    // console.log(event.target);
    // console.log(window.isScrolling);
    // this.lastActiveLink = event.target;

    // this.resetLinks(event.target); //Reset nested children, skipping over active link

    // if (!window.isScrolling){
    // Animate out hidden links, animate in visible links
    // if (event.detail.isVisible !== false && event.detail.isDropdownLink === false) {
    if (event.detail.isVisible) {
      this._animateIn(event.target);
    } else {
      this._animateOut(event.target);
    }
    // }
    // else {
    //   // this._animateIn(event.target);
    // }

    this.activeLink = event.target;
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
    if (this.isAnimating && window.isScrolling) {
      return;
    }

    if (!this.isAnimating){
      this.isAnimating = true;
    }

    const linkPos = link.getBoundingClientRect(); // object w/ all positioning
    // const extraOffsetHorizontal = link.style.paddingLeft;


    const linkWidth = linkPos.width;
    const linkHeight = linkPos.height;
    const linkOffsetLeft = link.offsetLeft;
    const linkOffsetTop = link.offsetTop;
    const linkOffsetVertical = linkPos.top + linkHeight / 2;
    const linkOffsetHorizontal = linkOffsetLeft + linkWidth / 2;
    // const mq = window.matchMedia('(max-width: 600px)');

    // console.log(window.isScrolling);
    // console.log(linkPos);
    // console.log(link);
    // console.log(isVisible(link));

    if (link.hasAttribute('is-dropdown-link')) {
      this._indicator.style.opacity = 0;
      return;
    }

    if (!this.activeLink) {
      // No link is currently active; the first link to become active is a special snowflake when it
      // comes to animation.

      // First, immediately center the indicator.
      this._indicator.style.transition = 'none';
      this._indicator.style.opacity = 1;


      // if (mq.matches) {
      //   this._indicator.style.setProperty('--bolt-nav-indicator-transform', linkOffsetVertical + 'px');

      // } else {
      this._indicator.style.transform = 'translateX(' + linkOffsetHorizontal + 'px) scaleX(1)';
      // }

      // Then, reset the transition and expand the indicator to the full width of the link.
      this.flushCss(this._indicator);
      this._indicator.style.transition = '';


      // if (mq.matches) {
      //   this._indicator.style.opacity = 1;
      //   this._indicator.style.height = linkHeight + 'px';
      //   this._indicator.style.width = '2px';
      //   // this._indicator.style.transform = 'translateY(' + linkOffsetTop + 'px)';
      //   this._indicator.style.setProperty('--bolt-nav-indicator-transform', linkOffsetTop + 'px');

      // } else {
      this._indicator.style.opacity = 1;
      this._indicator.style.width = linkWidth + 'px';
      this._indicator.style.transform = 'translateX(' + linkOffsetLeft + 'px) scaleX(1)';
      // }


    } else {
      // console.log(isVisible(this.activeLink));
      // if (mq.matches) {
      //   this._indicator.style.opacity = 1;
      //   this._indicator.style.height = linkHeight + 'px';
      //   this._indicator.style.width = '2px';
      //   this._indicator.style.setProperty('--bolt-nav-indicator-transform', linkOffsetTop + 'px');
      //   // this._indicator.style.transform = 'translateY(' + linkOffsetTop + 'px)';
      //   // this._indicator.style['--bolt-nav-indicator-transform-fallback'] = 'translateY(' + linkOffsetTop + 'px)';
      // } else {
        this._indicator.style.opacity = 1;
        this._indicator.style.width = linkWidth + 'px';
        this._indicator.style.transform = 'translateX(' + linkOffsetLeft + 'px) scaleX(1)';
      // }
    }
  }



  // `_animateIn` animates the line for the active link
  _animateOut(link) {
    // console.log('_animateOut');
    // console.log(link);
    this._indicator.style.opacity = 0;
    // this._indicator.style.transform = 'scaleX(0)';

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
    this.gumshoeStateModule = BoltNavIndicator.initGumshoeModule(this);
    this.gumshoeStateModule.setOffset(this.offset);

    console.log(this.gumshoeStateModule);

  }

  // `<bolt-nav-link>` emits a custom event when the link is active
  connecting() {
    Promise.all([
      customElements.whenDefined('bolt-priority-nav'),
      customElements.whenDefined('bolt-navlink'),
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

      // this.addEventListener(this.transitionStartEvent, () => {
      //   console.log('is-animating');
      //   this.isAnimating = true;
      // });

      this.addEventListener(this.transitionEndEvent, () => {


        if (this.isAnimating){
          this.isAnimating = false;
          console.log('is-done-animating');
        }
      });

      // Create new instance
      // var transition = new TimedTransition(this._indicator);
      // // , {
      // //   // This is called by `transition.on()`.
      // //   // procToOn: function () {
      // //   //   element.style.marginLeft = '600px';
      // //   // },
      // //   // // This is called by `transition.off()`.
      // //   // procToOff: function () {
      // //   //   element.style.marginLeft = '0';
      // //   // }
      // // });

      // function printLog(event) {
      //   console.log('[%s] <%s> propertyName: %s elapsedTime: %f pseudoElement: %s',
      //     Date.now(),
      //     event.type,
      //     event.propertyName,
      //     event.elapsedTime,
      //     event.pseudoElement);
      // }

      // // Event types are prefixed with `timed`.
      // ['timedTransitionRun', 'timedTransitionStart',
      //   'timedTransitionEnd', 'timedTransitionCancel',
      // ].forEach(function (type) {
      //   this._indicator.addEventListener(type, printLog, true);
      // });

      // transition.on();


      // this._indicator.addEventListeneron(this.transitionStartEvent, () => {
      //   this.isAnimating = true;
      // });
      //   'transitionend MSTransitionEnd webkitTransitionEnd oTransitionEnd',
      //   function () {
      //     this.isAnimating =
      //     $(this).data("transitioning", false); // Transition has ended.
      //   }
      // );


      // // Listen for smooth-scroll events
      // document.addEventListener('scrollStart', this.scrollStart, false);
      // document.addEventListener('scrollStop', this.scrollStop, false);
      // document.addEventListener('scrollCancel', this.scrollCancel, false);

    });
  }

  // scrollStart(){
  //   console.log(this.activeLink);

  //   this.smoothScrolling = true;
  // }

  // scrollStop() {
  //   console.log(this.activeLink);

  //   this.smoothScrolling = false;
  // }

  // scrollCancel() {
  //   console.log(this.activeLink);

  //   this.smoothScrolling = false;
  // }

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

