// import { define, props } from '@bolt/core/utils';
// import classNames from 'classnames/bind';
// import { html, withLitHtml } from '@bolt/core/renderers/renderer-lit-html';
// import { ifDefined } from 'lit-html/directives/if-defined';
// import styles from './tooltip.scss';

// let cx = classNames.bind(styles);

// @define
// class BoltTooltip extends withLitHtml() {
//   static is = 'bolt-tooltip';

//   static props = {
//     triggerText: {
//       ...props.string,
//       ...{ default: undefined },
//     },
//     triggerType: {
//       ...props.string,
//       ...{ default: undefined },
//     },
//     triggerTransform: {
//       ...props.string,
//       ...{ default: undefined },
//     },
//     triggerIconName: {
//       ...props.string,
//       ...{ default: undefined },
//     },
//     triggerIconSize: {
//       ...props.string,
//       ...{ default: 'medium' },
//     },
//     triggerToggleText: {
//       ...props.string,
//       ...{ default: undefined },
//     },
//     triggerToggleIcon: {
//       ...props.string,
//       ...{ default: undefined },
//     },
//     content: props.any,
//     noWrap: props.boolean,
//     spacing: {
//       ...props.string,
//       ...{ default: 'small' },
//     },
//     triggerID: props.string,
//     direction: {
//       ...props.string,
//       ...{ default: 'up' },
//     },
//     count: {
//       ...props.string,
//       ...{ default: undefined },
//     }, // For use ONLY with share
//     isOpen: {
//       ...props.boolean,
//       ...{ default: false },
//     },
//   };

//   constructor(self) {
//     self = super(self);
//     self.clickHandler = self.clickHandler.bind(self);

//     self.handleMovingOverTrigger = self.handleMovingOverTrigger.bind(self);
//     self.handleMovingOutOfTrigger = self.handleMovingOutOfTrigger.bind(self);

//     self.handleMovingOverContent = self.handleMovingOverContent.bind(self);
//     self.handleMovingOutOfContent = self.handleMovingOutOfContent.bind(self);

//     self.handleExternalClick = self.handleExternalClick.bind(self);
//     return self;
//   }

//   connected() {
//     super.connected && super.connected();
//     this.triggerID = `bolt-tooltip-id-${Math.floor(Math.random() * 20)}`;
//     this.isWatchingForExternalClicks = false;

//     this.addEventListener('mouseover', this.handleMovingOverTrigger);
//     this.addEventListener('mouseleave', this.handleMovingOutOfTrigger);
//   }

//   rendered() {
//     super.rendered && super.rendered();
//     if (!this.hasAttribute('ready')) {
//       this.setAttribute('ready', '');
//     }
//     this.tooltipContentElem = this.renderRoot.querySelector(
//       '.c-bolt-tooltip__content',
//     );

//     if (this.tooltipContentElem) {
//       this.tooltipContentElem.addEventListener(
//         'mouseover',
//         this.handleMovingOverContent,
//       );
//       this.tooltipContentElem.addEventListener(
//         'mouseleave',
//         this.handleMovingOutOfContent,
//       );
//     }

//     if (
//       this.triggerType === 'button' &&
//       this.isWatchingForExternalClicks === false &&
//       this.isOpen === true
//     ) {
//       document.addEventListener('click', this.handleExternalClick);
//       this.isWatchingForExternalClicks = true;
//     } else if (
//       this.isWatchingForExternalClicks === true &&
//       this.triggerType !== 'button'
//     ) {
//       document.removeEventListener('click', this.handleExternalClick);
//     }
//   }

//   disconnected() {
//     super.disconnected && super.disconnected();

//     this.removeEventListener('mouseover', this.handleMovingOverTrigger);
//     this.removeEventListener('mouseleave', this.handleMovingOutOfTrigger);

//     if (this.tooltipContentElem) {
//       this.tooltipContentElem.removeEventListener(
//         'mouseover',
//         this.handleMovingOverContent,
//       );
//       this.tooltipContentElem.removeEventListener(
//         'mouseleave',
//         this.handleMovingOutOfContent,
//       );
//     }

//     if (this.isWatchingForExternalClicks === true) {
//       document.removeEventListener('click', this.handleExternalClick);
//       this.isWatchingForExternalClicks = false;
//     }
//   }

//   clickHandler() {
//     this.isOpen = !this.isOpen;
//   }

//   handleExternalClick(e) {
//     if (
//       (e.target.closest('bolt-tooltip') &&
//         e.target.closest('bolt-tooltip') === this) ||
//       this.isOpen === false
//     ) {
//       return;
//     }
//     this.isOpen = false;
//   }

//   handleMovingOverContent(e) {
//     this.isHoveringOverContent = true;

//     if (this.isOpen !== true && this.triggerType !== 'button') {
//       this.isOpen = true;
//     }
//   }

//   handleMovingOutOfContent(e) {
//     this.isHoveringOverContent = false;
//     setTimeout(() => {
//       if (!this.isHoveringOverTrigger && this.triggerType !== 'button') {
//         this.isOpen = false;
//       }
//     }, 10);
//   }

//   handleMovingOutOfTrigger(e) {
//     this.isHoveringOverTrigger = false;

//     setTimeout(() => {
//       if (!this.isHoveringOverContent && this.triggerType !== 'button') {
//         this.isOpen = false;
//       }
//     }, 10);
//   }

//   handleMovingOverTrigger(e) {
//     this.isHoveringOverTrigger = true;

//     if (this.isOpen !== true && this.triggerType !== 'button') {
//       this.isOpen = true;
//     }
//   }

//   setClick() {
//     if (this.triggerType === 'button') {
//       return html`
//         <bolt-tooltip-trigger
//           class="${this.isOpen ? 'is-active' : ''} c-bolt-tooltip__trigger"
//           aria-describedby=${this.triggerID}
//           @click=${this.clickHandler}
//         >
//           ${this.setTrigger()}
//         </bolt-tooltip-trigger>
//       `;
//     } else {
//       return html`
//         <bolt-tooltip-trigger
//           class="${this.isOpen ? 'is-active' : ''} c-bolt-tooltip__trigger"
//           aria-describedby=${this.triggerID}
//         >
//           ${this.setTrigger()}
//         </bolt-tooltip-trigger>
//       `;
//     }
//   }

//   setTrigger() {
//     if (this.triggerType === 'button') {
//       return html`
//         <bolt-button
//           color="secondary"
//           transform="${ifDefined(this.triggerTransform)}"
//           >${this.triggerIconName &&
//             html`
//               <bolt-icon
//                 name="${this.isOpen
//                   ? this.triggerToggleIcon
//                   : this.triggerIconName}"
//                 size="${this.triggerIconSize}"
//                 slot="before"
//               ></bolt-icon>
//             `}
//           ${this.isOpen
//             ? this.triggerToggleText
//             : this.triggerText}</bolt-button
//         >
//       `;
//     } else {
//       return html`
//         ${this.triggerIconName &&
//           html`
//             <bolt-icon
//               name="${this.triggerIconName}"
//               size="${this.triggerIconSize}"
//               slot="before"
//             ></bolt-icon>
//           `}
//         ${this.triggerText}
//       `;
//     }
//   }

//   render() {
//     const classes = cx('c-bolt-tooltip is-align-center is-rendered', {
//       [`c-bolt-tooltip${
//         this.triggerType === 'button' ? `--action` : `--help`
//       }`]: this.triggerType,
//       [`is-open`]: this.isOpen,
//       [`is-push-${this.direction}`]: this.direction,
//       [`c-bolt-tooltip--nowrap`]: this.noWrap,
//       [`c-bolt-tooltip--spacing-${this.spacing}`]: this.spacing,
//     });

//     const contentClasses = cx('c-bolt-tooltip__content', {
//       [`c-bolt-tooltip__content--${this.count}`]: this.count,
//     });

//     return html`
//       ${this.addStyles([styles])}
//       <span class=${classes}>
//         ${this.setClick()}
//         <bolt-tooltip-content
//           id=${ifDefined(this.triggerID)}
//           class=${contentClasses}
//           role="tooltip"
//           aria-hidden="true"
//         >
//           <span class="c-bolt-tooltip__content-bubble"
//             >${this.slot('default')}</span
//           >
//         </bolt-tooltip-content>
//       </span>
//     `;
//   }
// }

// export { BoltTooltip };
