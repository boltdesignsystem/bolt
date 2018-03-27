// HyperHTML Renderer ported to SkateJS
import {
  withLifecycle,
  withChildren,
  withContext,
  withRenderer,
  withUpdate,
  // withComponent,
  shadow,
  props,
} from 'skatejs';
import { hyper, bind } from 'hyperhtml/cjs';
import { hasNativeShadowDomSupport } from '../utils/environment';

// const defineProperty = Object.defineProperty;

import {
  declarativeClickHandler,
  findParentTag
} from '../';


export function BoltComponent(Base = HTMLElement) {
  return class extends withLifecycle(withChildren(withContext(withUpdate(withRenderer(Base))))) {

    static props = {
      onClick: props.string,
      onClickTarget: props.string
    }

    constructor(...args) {
      super(...args);


      this.hyper = hyper;


      if (findParentTag(this, 'FORM') || this.getAttribute('no-shadow') !== null) {
        this.useShadow = false;
      } else {
        this.useShadow = hasNativeShadowDomSupport;
      }
    }

    connectedCallback() {
      if (this.dataset.ssrContent) {
        this.innerHTML = JSON.parse(this.dataset.ssrContent);
      }

      this._checkSlots();

      this.connecting && this.connecting();
      // super.connectedCallback && super.connectedCallback();
      // this.connected && this.connected();
    }

    disconnectedCallback() {
      this.disconnecting && this.disconnecting();
    }


    // lazily bind once hyperHTML logic
    // to either the shadowRoot, if present and open,
    // the _shadowRoot property, if set due closed shadow root,
    // or the custom-element itself if no Shadow DOM is used.
    // get html() {
    //   return this._html$ || (this.html = bind(this.renderRoot));

    //   //   // in case of Shadow DOM {mode: "open"}, use it
    //   //   this.shadowRoot ||
    //   //   // in case of Shadow DOM {mode: "close"}, use it
    //   //   // this needs the following reference created upfront
    //   //   // this._shadowRoot = this.attachShadow({mode: "close"});
    //   //   this._shadowRoot ||
    //   //   // if no Shadow DOM is used, simply use the component
    //   //   // as container for its own content (it just works too)
    //   //   this
    //   // ));
    // }

    // // it can be set too if necessary, it won't invoke render()
    // set html(value) {
    //   defineProperty(this, '_html$', { configurable: true, value: value });
    // }

    addStyles(stylesheet) {
      let styles = Array.from(stylesheet);
      styles = styles.join(' ');

      if (this.useShadow) {
        return hyper.wire() `
          <style>${ styles} </style>
        `;
      }
    }

    slot(name) {
      if (this.useShadow && hasNativeShadowDomSupport) {
        if (name === 'default') {
          return hyper.wire() `
            <slot />
          `;
        } else {
          return hyper.wire() `
            <slot name="${name}" />
          `;
        }
      } else {
        if (this.slots[name]) {
          return hyper.wire() `
            ${this.slots.default}
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
        default: []
      };

      const elem = this;

      // Loop through nodelist
      this.childNodes.forEach(function (child, index, nodelist) {
        const slotName = child.getAttribute ? child.getAttribute("slot") : null;

        if (!slotName) {
          elem.slots.default.push(child);
        } else {
          elem.slots[slotName] = child;
        }
      });
    }

    get renderRoot() {
      if (hasNativeShadowDomSupport && this.useShadow === true) {
        return super.renderRoot || shadow(this);
      } else {
        return this;
      }
    }


    renderer(root, render) {
      this.html = this.html || bind(root);
      // this.html = this._html$;
      // this.html = this.html || bind(root);
      render();
    }
  }
};