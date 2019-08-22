/** @jsx h */
// Temp working version of @skatejs/renderer-preact till SkateJS fixes this upstream in the SkateJS monorepo

import { name, withComponent, shadow, props } from 'skatejs';
import preact, { h, render } from 'preact';
import { BoltBase } from './bolt-base';

// TODO make this a Symbol() when it's supported.
const preactNodeName = '__preactNodeName';

let oldVnode;

function newVnode(vnode) {
  let fn = vnode.nodeName;
  if (fn && fn.prototype instanceof HTMLElement) {
    if (!fn[preactNodeName]) {
      const prefix = fn.name;
      customElements.define(
        (fn[preactNodeName] = name(prefix)),
        class extends fn {},
      );
    }
    vnode.nodeName = fn[preactNodeName];
  }
  return vnode;
}

function setupPreact() {
  oldVnode = preact.options.vnode;
  preact.options.vnode = newVnode;
}

function teardownPreact() {
  preact.options.vnode = oldVnode;
}

export { h } from 'preact';

class _withPreact extends BoltBase {
  get props() {
    // We override props so that we can satisfy most use
    // cases for children by using a slot.
    return {
      ...super.props,
      isServer: {
        ...props.boolean,
        ...{ default: bolt.isServer },
      },
      isClient: {
        ...props.boolean,
        ...{ default: bolt.isClient },
      },
    };
  }

  constructor(...args) {
    super(...args);
  }

  renderStyles(styles) {
    if (styles) {
      return this.useShadow && <style>{styles}</style>;
    }
  }

  // WIP slot function working in Preact
  // slot(name) {
  //   if (this.useShadow && hasNativeShadowDomSupport) {
  //     if (name === 'default') {
  //       return (
  //         <slot />
  //       )
  //     } else {
  //       // return this.html(`
  //       //   <slot name="${name}" />
  //       // `);
  //       return (
  //         <slot name={name} />
  //       )
  //     }
  //   } else {
  //     if (this.slots[name]) {
  //       // return this.slots[name];
  //       const slotItems = this.slots[name];

  //       var frag = document.createDocumentFragment();
  //       var rootNode = document.createElement('div');

  //       for (var i = 0; i < slotItems.length; ++i) {
  //         frag.appendChild(slotItems[i]);
  //       }

  //       rootNode.appendChild(frag);
  //       rootNode.replaceWith(rootNode.firstChild);

  //       return rootNode;
  //     }
  //     else {
  //       console.log(`The ${name} slot doesn't appear to exist...`);
  //     }
  //   }
  // }

  renderer(root, call) {
    setupPreact();
    this._renderRoot = root;
    this._preactDom = render(call(), root, this._preactDom || root.children[0]);
    teardownPreact();
  }

  disconnectedCallback() {
    super.disconnectedCallback && super.disconnectedCallback();
    // Render null to unmount. See https://github.com/skatejs/skatejs/pull/1432#discussion_r183381359
    this._preactDom = render(null, this._renderRoot, this._preactDom);
    this._renderRoot = null;
  }
}

export class withPreact extends withComponent(_withPreact) {}
