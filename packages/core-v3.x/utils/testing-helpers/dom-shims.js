/* eslint "no-multi-assign": "off", "new-cap": "off" */

/**
 * Node.js polyfill for rendering Panel components without a browser.
 * Makes the following objects globally available:
 * Comment, document, Document, Element, HTMLElement, Node, requestAnimationFrame, Text.
 * Most of the available DOM API functionality is provided by
 * [html-element]{@link https://github.com/1N50MN14/html-element}, with some patches for
 * the Web Components API.
 *
 * @module isorender/dom-shims
 *
 * @example <caption>Rendering app HTML to stdout</caption>
 * import 'panel/isorender/dom-shims';
 * import { Component } from 'panel';
 * customElements.define('my-widget', class extends Component {
 *   // app definition
 * });
 * const myWidget = document.createElement('my-widget');
 * document.body.appendChild(myWidget);
 * requestAnimationFrame(() => console.log(myWidget.outerHTML));
 */

import 'html-element/global-shim';
import requestAnimationFrame from 'raf';

// make raf globally available unless a requestAnimationFrame implementation
// is already there
global.requestAnimationFrame =
  global.requestAnimationFrame || requestAnimationFrame;

// patch DOM insertion functions to call connectedCallback on Custom Elements
[`appendChild`, `insertBefore`, `replaceChild`].forEach((funcName) => {
  const origFunc = Element.prototype[funcName];
  Element.prototype[funcName] = function () {
    const child = origFunc.apply(this, arguments);
    requestAnimationFrame(() => {
      if (!child.initialized && child.connectedCallback) {
        child.connectedCallback();
      }
    });
  };
});

// html-element only provides Element (with a lot of the HTMLElement API baked in).
// Use HTMLElement as our Web Components-ready extension.
class HTMLElement extends Element {
  setAttribute(name, value) {
    const oldValue = this.getAttribute(name);
    super.setAttribute(...arguments);
    if (this.attributeChangedCallback && this.__attrIsObserved(name)) {
      this.attributeChangedCallback(name, oldValue, value);
    }
  }

  hasAttribute(name) {
    return !!this.attributes.find((attr) => attr.name === name);
  }

  __attrIsObserved(name) {
    if (!this.__observedAttrs) {
      this.__observedAttrs = this.constructor.observedAttributes || [];
    }
    return this.__observedAttrs.includes(name);
  }
}

global.HTMLElement = HTMLElement;

// Document patches for Custom Elements

const registeredElements = {};

const originalCreateElement = Document.prototype.createElement;
Document.prototype.createElement = function (tagName) {
  tagName = tagName.toLowerCase();
  const customElProto = registeredElements[tagName];
  let el;
  if (customElProto) {
    el = new customElProto();
    el.nodeName = el.tagName = tagName;
  } else {
    el = originalCreateElement(...arguments);
  }
  return el;
};

global.customElements = global.customElements || {
  define(tagName, proto) {
    tagName = tagName.toLowerCase();
    if (registeredElements[tagName]) {
      throw DOMException(
        `Registration failed for type '${tagName}'. A type with that name is already registered.`,
      );
    } else {
      registeredElements[tagName] = proto;
    }
  },
};
