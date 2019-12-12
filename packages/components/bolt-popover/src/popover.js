// import { supportsCSSVars } from '@bolt/core/utils';
// import classNames from 'classnames/dedupe';
// import {
//   customElement,
//   BoltElement,
//   html,
//   styleMap,
//   unsafeCSS,
// } from '@bolt/element';
// import popoverStyles from './popover.scss';
// import schema from '../popover.schema';

// let cx = classNames.bind(popoverStyles);

// @customElement('bolt-popover')
// class BoltPopover extends BoltElement {
//   static get properties() {
//     return {
//       spacing: String,
//       placement: String,
//       noCssVars: {
//         type: Boolean,
//         attribute: 'no-css-vars',
//       },
//     };
//   }

//   constructor() {
//     super();
//     this.noCssVars = supportsCSSVars ? false : true;
//   }

//   static get styles() {
//     return [unsafeCSS(popoverStyles)];
//   }

//   render() {
//     const spacing = this.spacing || schema.properties.spacing.default;
//     const placement = this.placement || schema.properties.placement.default;

//     const classes = cx('c-bolt-popover', {
//       [`c-bolt-popover--spacing-${spacing}`]: spacing,
//       [`c-bolt-popover--${placement}`]: placement,
//     });

//     return html`
//       <div class="${cx(`c-bolt-popover`)}">
//         ${this.slotify('trigger')}
//         <div class="${classes}">
//           ${this.slotify('default')}
//         </div>
//       </div>
//     `;
//   }
// }

// export { BoltPopover };
