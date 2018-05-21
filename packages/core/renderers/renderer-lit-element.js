// HyperHTML Renderer ported to SkateJS
// import {
//   // withComponent,
//   shadow,
//   props,
// } from 'skatejs';
import {LitElement, html} from '@polymer/lit-element';
// import { hyper, bind } from 'hyperhtml/cjs';
import { hasNativeShadowDomSupport } from '../utils/environment';
import { findParentTag } from '../utils/find-parent-tag';


export class BoltLitComponent extends LitElement {
  // return  {

// export class BoltLitComponent extends LitElement {
//   return class extends withComponent(Base) {

    // static props = {
    //   onClick: props.string,
    //   onClickTarget: props.string,
    // }

  // constructor() {
  //   super();

  //   if (findParentTag(this, 'FORM') || this.getAttribute('no-shadow') !== null) {
  //     this.useShadow = false;
  //   } else {
  //     this.useShadow = hasNativeShadowDomSupport;
  //   }
  // }

  /**
   * Override which sets up element rendering by calling* `_createRoot`
   * and `_firstRendered`.
   */
  ready() {
    this._root = this._createRoot();
    super.ready();
    this._checkSlots();
    this._firstRendered();
  }

  // connectedCallback() {
  //   // if (this.dataset.ssrContent) {
  //   //   this.innerHTML = JSON.parse(this.dataset.ssrContent);
  //   // }
  //   this._checkSlots();
  //   // this.connecting && this.connecting();
  //   // this.connected && this.connected();
  // }

  // disconnectedCallback() {
  //   this.disconnecting && this.disconnecting();
  //   this.disconnected && this.disconnected();
  // }

  addStyles(stylesheet) {
    let styles = Array.from(stylesheet);
    styles = styles.join(' ');

    if (this.useShadow) {
      return html(this)`
        <style>${ styles }</style>
      `;
    }
  }

  slot(name) {
    if (this.useShadow && hasNativeShadowDomSupport) {
      if (name === 'default') {
        return html`
          <slot />
        `;
      } else {
        return html`
          <slot name="${name}" />
        `;
      }
    } else {
      if (this.slots[name]) {
        return html`
          ${this.slots[name]}
        `;
      }
      else {
        console.log(`The ${name} slot doesn't appear to exist...`);
      }
    }
  }


  // Inspired by https://codepen.io/jovdb/pen/ddRZKo
  _checkSlots() {
    this.slots = {
      default: [],
    };

    const elem = this;

    // Loop through nodelist
    this.childNodes.forEach(function (child, index, nodelist) {
      const slotName = child.getAttribute ? child.getAttribute('slot') : null;

      if (!slotName) {
        elem.slots.default.push(child);
      } else {
        if (elem.slots[slotName]){
          elem.slots[slotName].push(child);
        } else {
          elem.slots[slotName] = [];
          elem.slots[slotName].push(child);
        }
      }
    });
  }

  _createRoot() {
    if (hasNativeShadowDomSupport && this.useShadow === true) {
      return this.attachShadow({mode : 'open'});
      // return super.renderRoot || shadow(this);
    } else {
      return this;
    }
  }

    // renderer(root, render) {
    //   this.html = this.html || bind(root);
    //   render();
    // }
};
// };
