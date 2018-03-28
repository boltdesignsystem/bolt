import {
  define,
  props,
  withComponent,
  css,
  hasNativeShadowDomSupport,
  BoltComponent,
  sanitizeBoltClasses
} from '@bolt/core';

import handorgel from './handorgel/handorgel';

import styles from './dropdown.scss';
import heightUtils from '@bolt/global/styles/07-utilities/_utilities-height.scss';





@define
export class BoltDropdown extends BoltComponent() {
  static is = 'bolt-dropdown';

  // static get observedAttributes() { return ['toggle-text']; }

  static props = {
    autoOpen: props.boolean,
    collapse: props.boolean,
    center: props.boolean,
    ssrContent: props.string,
    toggleText: props.string,
    primaryUuid: props.string,
    secondaryUuid: props.string,
  }

  constructor() {
    super();
    this.useShadow = hasNativeShadowDomSupport;

    this.state = {
      open: this.props.autoOpen ? this.props.autoOpen : false,
      collapse: this.props.collapse ? this.props.collapse : false
    };

    this.uuid = "12345";


    // this.dropdownTemplate = document.createElement('template');

    // this.fragment = document.createDocumentFragment();

    // this.fragment.appendChild(
    //   this.template(),
    // );

    this.attachShadow({
      mode: 'open',
      // delegatesFocus: true,
    });


    // console.log(this.dropdownTemplate);

    // this.appendChild(
    //   this.dropdownTemplate.content.cloneNode(true),
    // );
    // this.html = this.hyper.wire(this);

    // console.log(this.html);
  }

  connecting() {
    if (this.props.ssrContent) {
      this.ssrContent = JSON.parse(this.props.ssrContent);
    }

    // if (this.shadowRoot) {
    //   this.shadowRoot.appendChild(
    //     this.addStyles([styles]),
    //   );
    //   this.shadowRoot.appendChild(
    //     this.template(),
    //   );
    //   this._shadowDropdown = this.shadowRoot.querySelector('.c-bolt-dropdown');
    // } else {
    //   this.appendChild(this.template());
    //   this._shadowDropdown = this.querySelector('.c-bolt-dropdown');
    // }
    // this._checkSlots();






    const elem = this;

    window.addEventListener('resize', function () {
      elem.autoHeight();
    });

    // const originalChildren = this.childNodes;
    // this.innerHTML = '';

    // this.appendChild(this.template());



    // console.log(this.dropdownTemplate);

    // .innerHTML = `
    //   <style>
    //     :host {
    //       contain: content;
    //     }
    //     button {
    //       display: block;
    //       background-color: initial;
    //       border: initial;
    //       width: 100%;
    //     }
    //   </style>
    //   <button><slot></slot></button>
    // `;






    // this.dropdownTemplate.appendChild = this.fragment;

    // console.log(this.dropdownTemplate);
    // if (this.useShadow){
    //   this.shadowRoot.append

    //   Node.prototype.appendChildren = function (...children) {
    // }

    // console.log(test);
  }

  // attributeChangedCallback() {
  //   this.render();
  // }

  autoHeight() {
    if (this.props.collapse && window.matchMedia("(min-width: 600px)").matches) {
      this.contentElem.classList.add('u-bolt-height-auto');
      // this.dropdown.open();
    } else if (this.props.collapse) {
      this.contentElem.classList.remove('u-bolt-height-auto');

    }
  }

  close() {
    console.log('close dropdown');
    // this.dropdown.folds[0].close();
  }

  get open() {
    return this.state.open;
    // this.dropdown.folds[0].close();
  }

  // Sets the `active` state for the current custom element
  set open(value) {
    /* Properties can be set to all kinds of string values. This
     * makes sure it’s converted to a proper boolean value using
     * JavaScript’s truthiness & falsiness principles.
     */

    if (value && value === true) {
      this.state.open = true;
      this.setAttribute('open', 'open');
    } else {
      this.removeAttribute('open');
    }
  }


  // get expanded(){
  //   console.log(this.dropdown);
  //   return this.dropdown.expanded;
  // }


// as function, same props, same node
  dropdownHeader() {
    const dropdownHeaderClasses = css(
      'c-bolt-dropdown__header',
      this.props.center ? 'c-bolt-dropdown__header--center' : ''
    );

    return this.hyper.wire(this.props) `
      <h3 class="${dropdownHeaderClasses}">
        <button class="c-bolt-dropdown__header-button">
          ${this.props.toggleText}

          <span class="c-bolt-dropdown__header-icons">
            <div class="c-bolt-dropdown__header-icons-inner">
              <span class="c-bolt-dropdown__header-icon c-bolt-dropdown__header-icon--open">
                <bolt-icon name="chevron-down"></bolt-icon>
              </span>

              <span class="c-bolt-dropdown__header-icon c-bolt-dropdown__header-icon--close">
                <bolt-icon name="chevron-up"></bolt-icon>
              </span>
            </div>
          </span>
        </button>
      </h3>`;
  }



  template() {
    const classes = css(
      'c-bolt-dropdown',
      this.props.collapse ? 'c-bolt-dropdown--collapse@small' : ''
    );

    return this.hyper.wire(this.props) `
      <div class="${classes}" id="${this.uuid}">
        ${this.dropdownHeader()}

        <div class="c-bolt-dropdown__content">
          <div class="c-bolt-dropdown__content-inner">
            ${this.slot('default')}
          </div>
        </div>
      </div>
    `;
  }



  render() {


    this.dropdownTemplate = document.createDocumentFragment();
    this.dropdownTemplate.appendChild(this.template());

    this.contentElem = this.dropdownTemplate.querySelector('.c-bolt-dropdown__content');

    this.autoHeight();


    this.dropdown = new handorgel(this.dropdownTemplate.querySelector('.c-bolt-dropdown'), {
      // whether multiple folds can be opened at once
      multiSelectable: true,
      // whether the folds are collapsible
      collapsible: true,

      // whether ARIA attributes are enabled
      ariaEnabled: true,
      // whether W3C keyboard shortcuts are enabled
      keyboardInteraction: true,
      // whether to loop header focus (sets focus back to first/last header when end/start reached)
      carouselFocus: true,

      // attribute for the header or content to open folds at initialization
      initialOpenAttribute: 'data-open',
      // whether to use transition at initial open
      initialOpenTransition: true,
      // delay used to show initial transition
      initialOpenTransitionDelay: 200,

      // header/content class if fold is open
      headerOpenClass: 'c-bolt-dropdown__header--open',
      contentOpenClass: 'c-bolt-dropdown__content--open',

      // header/content class if fold has been opened (transition finished)
      headerOpenedClass: 'c-bolt-dropdown__header--opened',
      contentOpenedClass: 'c-bolt-dropdown__content--opened',

      // header/content class if fold has been focused
      headerFocusClass: 'c-bolt-dropdown__header--focus',
      contentFocusClass: 'c-bolt-dropdown__content--focus',

      // header/content class if fold is disabled
      headerDisabledClass: 'c-bolt-dropdown__header--disabled',
      contentDisabledClass: 'c-bolt-dropdown__content--disabled',

      // header/content class if no transition should be active (applied on resize)
      headerNoTransitionClass: 'c-bolt-dropdown__header--notransition',
      contentNoTransitionClass: 'c-bolt-dropdown__content--notransition'
    });



    return this.html`
      ${ this.addStyles([styles, heightUtils]) }
      ${ this.dropdownTemplate }
    `;
  }
  //   console.log('render');


  //   const classes = css(
  //     'c-bolt-dropdown',
  //     this.props.collapse ? 'c-bolt-dropdown--collapse@small' : ''
  //   );



  //   this.template = this.wire(this.props) `
  //     <div class="${classes}" id="${this.uuid}">
  //       ${this.dropdownHeader()}

  //       <div class="c-bolt-dropdown__content">
  //         <div class="c-bolt-dropdown__content-inner">
  //           ${this.slot('default')}
  //         </div>
  //       </div>
  //     </div>
  //   `;

  //   // this.appendChild(this.template);
  //   console.log(this.template);


  //   // if (this.ssrContent) {
  //   //   this.innerHTML = this.ssrContent;
  //   // }



  //   // console.log(this.renderRoot);




  //   // console.log(this.dropdown);


  //   // return this.html`
  //   //   ${ this.addStyles([styles])}

  //   //   <div class="${classes}" id="${this.uuid}">
  //   //     ${this.dropdownHeader()}

  //   //     <div class="c-bolt-dropdown__content">
  //   //       <div class="c-bolt-dropdown__content-inner">
  //   //         ${this.slot('default')}
  //   //       </div>
  //   //     </div>
  //   //   </div>
  //   // `;
  //   /**
  //  * Closes the current select on any click outside of it.
  //  *
  //  */
  //   // const elem = this;



  //   // console.log(this.contentElem);






  //   // this.dropdown.folds.forEach(fold => {
  //   //   // console.log(child.text);
  //   //   console.log(fold);
  //   // });
  //   // this.dropdown.on('fold:open', (fold) => {
  //   //   console.log(fold);
  //   //   // ...
  //   // });
  //   // document.addEventListener('click', function (e) {
  //   //   if (!elem.contains(e.target) && elem.expanded === true) {
  //   //     elem.close();
  //   //   } else if (!elem.contains(e.target) && elem.expanded === true) {
  //   //     console.log('click outside of dropdown, but not currently open');
  //   //   } else {
  //   //     console.log('click inside of dropdown');
  //   //   }
  //   // });

  //   // window.addEventListener('resize', function () {
  //   //   elem.autoHeight();
  //   // });

  //   // return this.html`
  //   //   ${this.addStyles([styles])}
  //   //   ${this.template}
  //   // `
  // }

  // disconnecting() {

  // }

}





// console.log(BoltDropdownItem);

// import { define, props, withComponent, withPreact } from '@bolt/core';
// import { withReact, wrap } from '@bolt/core/renderers/renderer-react';
// import PropTypes from 'prop-types';
// import React from 'react';

// import React, { Component } from 'react';
// // import { render } from 'react-dom';

// // import classNames from 'classnames';
// import ClickHandler from '@bolt/core/helpers/click-handler';
// // import BoltIcon from '@bolt/components-icon';
// console.log(ClickHandler);

// // console.log(BoltIcon);


// // class ReactHello extends React.Component {
// //   render() {
// //     const { children, yell } = this.props;
// //     return <div>Hello, {yell ? <strong>{children}</strong> : children}!</div>;
// //   }
// // }

// // const Props = {
// //   ariaLabel: props.string,
// //   // children: PropTypes.node,
// //   className: props.string,
// //   defaultText: props.string,
// //   value: props.string,
// //   tabIndex: props.number,
// //   onClick: props.any,
// //   onChange: props.any,
// //   onOpen: props.any,
// //   onClose: props.any,
// //   selectedText: props.string,
// //   open: props.boolean,
// //   iconDescription: props.string,
// //   disabled: props.boolean,
// // };



// @define
// class BoltDropdown extends withPreact(withComponent()) {
//   static is = 'bolt-dropdown';

//   static props = {
//     ariaLabel: props.string,
//     // children: PropTypes.node,
//     className: props.string,
//     defaultText: props.string,
//     value: props.string,
//     tabIndex: props.number,
//     onClick: props.any,
//     onChange: props.any,
//     onOpen: props.any,
//     onClose: props.any,
//     selectedText: props.string,
//     open: props.boolean,
//     iconDescription: props.string,
//     disabled: props.boolean,
//       // name: props.string
//   };

//   // static defaultProps = {
//   //   tabIndex: 0,
//   //   open: false,
//   //   disabled: false,
//   //   // iconDescription: 'open list of options',
//   //   onChange: () => { },
//   //   onOpen: () => { },
//   //   onClose: () => { },
//   // };

//   constructor(props) {
//     super(props);

//     console.log('constructor');
//     this.useShadow = true;

//   }


//   static defaultProps = {
//     tabIndex: 0,
//     open: false,
//     disabled: false,
//     iconDescription: 'open list of options',
//     onChange: () => { },
//     onOpen: () => { },
//     onClose: () => { },
//   };

//   connectedCallback() {
//     this.state = this.resetState(this.props);
//     // console.log(this.state);

//     // this.state = {};
//     // this.setState(this.resetState(nextProps));
//   }

//   // shouldUpdate(prevProps, prevState) {
//   //   if (!prevState.open && this.state.open) {
//   //     this.props.onOpen();
//   //   }
//   //   if (prevState.open && !this.state.open) {
//   //     this.props.onClose();
//   //   }
//   // }

//   resetState(props) {
//     // const { children, selectedText, value, defaultText, open } = props;

//     // console.log(this.children);
//     // console.log(children);

//     let matchingChild;

//     const children = Array.prototype.slice.call(this.children);
//     children.forEach(child => {
//       console.log(child.text);
//     });


//     // React.Children.forEach(this.children, child => {
//     //   console.log(child);
//     //   // if (
//     //   //   child &&
//     //   //   (child.props.text === selectedText || child.props.value === value)
//     //   // ) {
//     //   //   matchingChild = child;
//     //   // }
//     // });

//     // if (matchingChild) {
//     //   return {
//     //     open,
//     //     selectedText: matchingChild.props.text,
//     //     value: matchingChild.props.value,
//     //   };
//     // }
//     return {
//       // open,
//       selectedText: this.defaultProps.defaultText,
//       value: '',
//     };
//   }

//   // close = () => {
//   //   this.state.open = false;
//   // };

//   // toggle = evt => {
//   //   if (this.props.disabled) {
//   //     return;
//   //   }

//   //   // Open on click, enter, or space
//   //   if (evt.which === 13 || evt.which === 32 || evt.type === 'click') {
//   //     this.state.open = !this.state.open;
//   //   }
//   // };

//   // handleItemClick = info => {
//   //   this.props.onChange(info);

//   //   this.state.selectedText = info.text;
//   //   this.state.value = info.value;
//   //   // this.setState({
//   //   //   :
//   //   //   value:
//   //   // });
//   // };




//   render() {
//     const {
//       ariaLabel,
//       tabIndex,
//       defaultText, // eslint-disable-line no-unused-vars
//       // iconDescription,
//       disabled,
//       selectedText, // eslint-disable-line no-unused-vars
//       onOpen, // eslint-disable-line no-unused-vars
//       onClose, // eslint-disable-line no-unused-vars
//       ...other
//     } = this.props;

//     console.log('render');

//     const childItems = Array.prototype.slice.call(this.children);

//     children.forEach(child => {
//       console.log(child.text);
//     });

//     // const children = React.Children.toArray(this.props.children)
//     //   .filter(Boolean)
//     //   .map(child =>
//     //     React.cloneElement(child, {
//     //       onClick: (...args) => {
//     //         child.props.onClick && child.props.onClick(...args);
//     //         this.handleItemClick(...args);
//     //       },
//     //       isDropdownOpen: this.state.open,
//     //     })
//     //   );
//     // console.log(children);

//     const dropdownClasses = classNames({
//       'c-bolt-dropdown': true,
//       'c-bolt-dropdown--open': this.state.open,
//       'c-bolt-dropdown--disabled': disabled,
//       [this.props.className]: this.props.className,
//     });
//     const dropdown = (
//       <ul>
//         <li className="c-bolt-dropdown__text">
//           {this.state.selectedText}
//         </li>
//       </ul>
//     //   <ClickHandler onClickOutside={this.close}>
//     //     <ul
//     //       {...other}
//     //       onClick={this.toggle}
//     //       onKeyPress={this.toggle}
//     //       value={this.state.value}
//     //       className={dropdownClasses}
//     //       tabIndex={tabIndex}
//     //       aria-label={ariaLabel}
//     //       role="listbox">
//     //       <li className="c-bolt-dropdown__text">{this.state.selectedText}</li>
//     //       <li>
//     //         Icon
//     //       </li>
//     //       <li>
//     //         <div
//     //           role="menu"
//     //           className="c-bolt-dropdown__content"
//     //           aria-label="inner dropdown menu">
//     //           <slot />
//     //         </div>
//     //       </li>
//     //     </ul>
//     //   </ClickHandler>
//     );

//     // const dropdown = (
//     //   <ClickHandler onClickOutside={this.close}>
//     //     <ul
//     //       {...other}
//     //       onClick={this.toggle}
//     //       onKeyPress={this.toggle}
//     //       value={this.state.value}
//     //       className={dropdownClasses}
//     //       tabIndex={tabIndex}
//     //       aria-label={ariaLabel}
//     //       role="listbox">
//     //       <li className="c-bolt-dropdown__text">{this.state.selectedText}</li>
//     //       <li>
//     //         Icon
//     //       </li>
//     //       <li>
//     //         <div
//     //           role="menu"
//     //           className="c-bolt-dropdown__content"
//     //           aria-label="inner dropdown menu">
//     //           <slot />
//     //         </div>
//     //       </li>
//     //     </ul>
//     //   </ClickHandler>
//     // );

//     return dropdown;
//   }
// }
