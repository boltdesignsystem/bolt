// import { define, props, withComponent } from 'skatejs';
// import { withPreact } from '@skatejs/renderer-preact';
// import { Preact, h } from 'preact';
// import hasNativeShadowDomSupport from './environment';
// import Component from './skate-component';

const $template = Symbol();




// function shadyCss(elem, css) {
//   if (hasNativeShadowDomSupport) {
//     return css;
//   }
//   const template = elem[$template] || (elem[$template] = document.createElement('template'));
//   template.innerHTML = `<style>${css}</style>`;
//   ShadyCSS.prepareTemplate(template, elem.localName);
// }

// // export const BoltComponent = define(
// export class BoltComponent extends withComponent(withPreact()) {
//   get renderCss() {
//     return shadyCss(this, this.style)
//   }
//   renderCallback() {
//     console.log(this.renderCss)
//     return [
//       h('style', this.renderCss),
//       super.renderCallback && super.renderCallback()
//     ];
//   }
// };
// );


// import { h as preactH } from 'preact';
// import { define, props, withComponent, withUpdate } from 'skatejs/src';
// import withPreact from '@skatejs/renderer-preact';

// // Compatiblity layer for renames.
// export const Component = class extends withComponent(withPreact()) {
//   childrenDidUpdate() {
//     if (this.childrenChangedCallback) {
//       return this.childrenChangedCallback(...args);
//     }
//     if (super.childrenDidUpdate) {
//       return super.childrenDidUpdate(...args);
//     }
//   }
//   willUpdate(...args) {
//     if (this.propsSetCallback) {
//       return this.propsSetCallback(...args);
//     }
//     if (super.willUpdate) {
//       return super.willUpdate(...args);
//     }
//   }
//   shouldUpdate(...args) {
//     if (this.propsUpdatedCallback) {
//       return this.propsUpdatedCallback(...args);
//     }
//     if (super.shouldUpdate) {
//       return super.shouldUpdate(...args);
//     }
//   }
//   didUpdate(...args) {
//     if (this.propsChangedCallback) {
//       return this.propsChangedCallback(...args);
//     }
//     if (super.didUpdate) {
//       return super.didUpdate(...args);
//     }
//   }
//   render(...args) {
//     if (this.renderCallback) {
//       return this.renderCallback(...args);
//     }
//     if (super.render) {
//       return super.render(...args);
//     }
//   }
//   renderCallback(...args) {
//     if (super.renderCallback) {
//       return super.renderCallback(...args);
//     }
//     if (super.render) {
//       return super.render(...args);
//     }
//   }
//   renderer(...args) {
//     if (this.rendererCallback) {
//       return this.rendererCallback(...args);
//     }
//     if (super.renderer) {
//       return super.renderer(...args);
//     }
//   }
//   didRender(...args) {
//     if (this.renderedCallback) {
//       return this.renderedCallback(...args);
//     }
//     if (super.didRender) {
//       return super.didRender(...args);
//     }
//   }
// };

// function args(fn) {
//   return fn
//     .toString()
//     .match(/\(([^)]*)\)/)[1]
//     .split(',')
//     .map(name => name.split('=')[0].trim());
// }

// export function component(render) {
//   const fnArgs = args(render);
//   class Comp extends Component {
//     static props = fnArgs.reduce((prev, curr) => {
//       prev[curr] = { attribute: { source: true } };
//       return prev;
//     }, {});
//     render() {
//       return render.call(this, ...fnArgs.map(n => this[n]));
//     }
//   }

//   // Allows the component to have a tag name hint based off the render function
//   // name.
//   Object.defineProperty(Comp, 'name', {
//     configurable: true,
//     value: render.name
//   });

//   return define(Comp);
// }

// export const h = preactH;