/** @jsx h */
import {
  define,
  props,
  withComponent,
  css,
  hasNativeShadowDomSupport,
  withPreact,
  sanitizeBoltClasses
} from '@bolt/core';

// import { BoltDropdownItem } from './dropdown-item';


import handorgel from './handorgel/handorgel';


var accordion = new handorgel(document.querySelector('.c-bolt-dropdown'), {

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
