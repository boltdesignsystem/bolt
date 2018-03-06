import {
  define,
  props,
  withComponent,
  css,
  hasNativeShadowDomSupport,
  withPreact,
  withHyperHTML,
  sanitizeBoltClasses,
} from '@bolt/core';

import styles from './accordion.scss';


import './src/extension';

// transpiler.toJSX(active_editor.getText())

// @define
// export class BoltAccordion extends withHyperHTML(withComponent()) {
//   static is = 'bolt-accordion';

//   static props = {

//   }

//   constructor() {
//     super();
//     this.useShadow = hasNativeShadowDomSupport;
//   }

//   render({ props, state }) {
//     const classes = css(
//       'c-bolt-accordion',
//       this.props.size ? `c-bolt-button--${this.props.size}` : '',
//     );




//     // Add inline <style> tag automatically if Shadow DOM is natively supported
//     return this.html`
//       ${ this.addStyles([styles, visuallyhiddenUtils]) }

//       ${
//         childElementIndex === null ? (
//           hasUrl ?
//             this.html`<a href="${this.props.url}" class="${classes}" target="${urlTarget}">${this.slots.default}</a>` :
//             this.html`<button class="${classes}">${this.slots.default}</button>`
//         )
//         : this.slots.default
//       }
//     `
//   }
// }
