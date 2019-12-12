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
//       nowrap: Boolean,
//       expanded: Boolean, // @to-do: Expanded indicates if popover content is expanded
//       uuid: String, // @to-do: uuid to be assigned to the id of popover content
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
//     const nowrap = this.nowrap || schema.properties.nowrap.default;

//     const classes = cx('c-bolt-popover', {
//       [`c-bolt-popover--spacing-${spacing}`]: spacing,
//       [`c-bolt-popover--${placement}`]: placement,
//       [`c-bolt-popover--nowrap`]: nowrap,
//       [`is-expanded`]: expanded,
//     });

//     return html`
//       <span class="${classes}">
//         // @to-do: Trigger slot should accept bolt-button and bolt-trigger; not recommended: button and a tags
//         // aria and role attributes should be passed to bolt-button or bolt-trigger
//         // aria-haspopup="true" is only for menu (popover content is a group of actions)
//         // aria-controls="${uuid}" is only for non-menu (popover content is a nav or simple content with links)
//         // aria-expanded="${expanded}" is for indicating if popover content is visible or not
//         // ${this.slotify('trigger')}
//         <span class="${cx(`c-bolt-popover__content`)}" id="${uuid}">
//           ${this.slotify('default')}
//         </span>
//       </span>
//     `;
//   }
// }

// export { BoltPopover };
