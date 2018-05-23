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

  // The element reacts to changes to the `active` attribute.
  // static get observedAttributes() {
  //   return ['active'];
  // }

  // attributeChangedCallback() {
  //   console.log(this.props.isActive);
  //   if (this.props.isActive) {
  //     this._shadowLink.classList.add(this.activeClass);
  //   } else {
  //     this._shadowLink.classList.remove(this.activeClass);
  //   }

  //   if (this.props.isDropdownLink) {
  //     this._shadowLink.classList.add(this.dropdownLinkClass);
  //   } else {
  //     this._shadowLink.classList.remove(this.dropdownLinkClass);
  //   }
  // }

  static props = {
    active: props.boolean,
    isDropdownLink: props.boolean,
  }

  constructor(self) {
    self = super(self);
    this.activeClass = 'is-active';
    this.dropdownLinkClass = 'is-dropdown-link';

    // this.state = {
    //   active: false,
    // };

    return self;
  }

  // // Returns whether or not the current `<bolt-navlink>` element has been active.
  // get active() {
  //   return this.hasAttribute('active');
  // }

  // // Sets the `active` state for the current custom element
  // set active(value) {
  //   /* Properties can be set to all kinds of string values. This
  //    * makes sure it’s converted to a proper boolean value using
  //    * JavaScript’s truthiness & falsiness principles.
  //    */

  //   value = Boolean(value);
  //   if (value) {
  //     this.setAttribute('active', '');
  //     this.props.isActive = true;
  //   } else {
  //     this.removeAttribute('active');
  //     this.props.isActive = false;
  //   }
  // }


  // Returns whether or not the current `<bolt-navlink>` element has been active.
  // get isDropdownLink() {
  //   return this.hasAttribute('is-dropdown-link');
  // }

  // // Sets the `active` state for the current custom element
  // set isDropdownLink(value) {
  //   /* Properties can be set to all kinds of string values. This
  //    * makes sure it’s converted to a proper boolean value using
  //    * JavaScript’s truthiness & falsiness principles.
  //    */

  //   value = Boolean(value);
  //   if (value) {
  //     this.setAttribute('is-dropdown-link', '');
  //   } else {
  //     this.removeAttribute('is-dropdown-link');
  //   }
  // }

  // Fix needed for Firefox and IE in which children are not available when constructor is called
  // resetShadowLink() {
  //   this._shadowLink = this.querySelector('a');
  // }

  // updated(prevProps, prevState) {
  //   console.log(this.props.isActive);
  //   // if (this.props.isActive !== prevProps.isActive) {
  //   this.dispatchEvent(
  //     new CustomEvent('activateLink', {
  //       detail: {
  //         isActiveNow: true,
  //         isVisible: isVisible(this) ? true : false,
  //         isDropdownLink: this.props.isDropdownLink,
  //       },
  //       bubbles: true,
  //     }),
  //   );
  //   }

    // if (this.props.isDropdownLink) {
    //   this._shadowLink.classList.add(this.dropdownLinkClass);
    // } else {
    //   this._shadowLink.classList.remove(this.dropdownLinkClass);
    // }




    // if (this.props.isActive && !this._shadowLink.hasClass(this.activeClass)) {
    //   this._shadowLink.classList.add(this.activeClass);
    // } else {
    //   this._shadowLink.classList.remove(this.activeClass);
    // }

    // console.log(this.props.isActive);
  // }

  // `attributeChangedCallback` processes changes to the `active` attr
  updated(prevProps, prevState) {

    if (this.props.isDropdownLink) {
      this._shadowLink.classList.add('is-dropdown-link');
    } else {
      this._shadowLink.classList.remove('is-dropdown-link');
    }
    // console.log(prevProps);

    // if (this.props.active !== prevProps.active) {
    //   console.log('props updated');


    // } else {
    //   console.log('active props not updated');
    // }


    // if (this.props.active) {
    //   this._shadowLink.classList.add(this.activeClass);
    // } else {
    //   this._shadowLink.classList.remove(this.activeClass);
    // }

    // if (this.props.isDropdownLink) {
    //   this._shadowLink.classList.add(this.dropdownLinkClass);
    // } else {
    //   this._shadowLink.classList.remove(this.dropdownLinkClass);
    // }
      // this.dispatchEvent(
      //   new CustomEvent('activateLink', {
      //     detail: {
      //       isActive: this.props.active,
      //       isVisible: isVisible(this) ? true : false,
      //       isDropdownLink: this.props.isDropdownLink,
      //     },
      //     bubbles: true,
      //   }),
      // );

    // switch (name) {
    //   case 'active':
        // if (!this._shadowLink) {
        //   this.resetShadowLink();
        // }
        // else if (this.active) {

          // Dispatch an event that signals to the parent what element is being active
      // this.dispatchEvent(
      //   new CustomEvent('activateLink', {
      //     detail: {
      //       isActiveNow: true,
      //       isVisible: isVisible(this) ? true : false,
      //       isDropdownLink: this.isDropdownLink,
      //     },
      //     bubbles: true,
      //   }),
      // );
        // }
        // else {
        //   this._shadowLink.classList.remove(isActiveClass);
        // }
        // break;
      // case 'is-dropdown-link':
      //   if (this.isDropdownLink) {
      //     this._shadowLink.classList.add('is-dropdown-link');
      //   } else {
      //     this._shadowLink.classList.remove('is-dropdown-link');
      //   }
    // }
  }

  onClick() {
    if (!this.props.active) {
      const scrollTarget = getScrollTarget(this._shadowLink);
      if (scrollTarget) {
        smoothScroll.animateScroll(scrollTarget, this._shadowLink, defaultScrollOptions);
      }
    }
  }


  isActive(){
    console.log(`is active: ${this.props.active}`);
    return this.props.active;
  }

  activate() {
    this._shadowLink.classList.add(this.activeClass);
    this.setAttribute('active', '');
    this.props.active = true;

    this.dispatchEvent(
      new CustomEvent('activateLink', {
        detail: {
          isActiveNow: true,
          isVisible: isVisible(this) ? true : false,
          isDropdownLink: this.props.isDropdownLink,
        },
        bubbles: true,
      }),
    );
  }

  deactivate() {
    this.removeAttribute('active');
    this.props.active = false;
    this._shadowLink.classList.remove(this.activeClass);
  }

  connecting() {
    this.addEventListener('click', this.onClick);

    this._shadowLink = this.querySelector('a');

    const isAlreadyActive = this._shadowLink.classList.contains(this.activeClass) || this._shadowLink.getAttribute('href') === window.location.hash;

    // Set an initially active link if appropriate.
    if (isAlreadyActive) {
      this.activate();
    }
  }

  disconnecting() {
    this.removeEventListener('click', this.onClick);
  }
}
