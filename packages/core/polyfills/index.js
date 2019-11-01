import '@bolt/polyfills';
import 'element-closest';
import 'whatwg-fetch';
import 'mdn-polyfills/Node.prototype.prepend';
import 'mdn-polyfills/Node.prototype.replaceWith'; // used in dropdown
import 'core-js/modules/es.array.iterator';
import 'core-js/modules/es.array.from';
import 'core-js/modules/es.string.starts-with';
import 'core-js/modules/es.array.includes';
import 'core-js/modules/es.array.for-each';
import 'core-js/modules/es.object.assign';
import 'core-js/modules/es.string.includes';
import 'core-js/modules/es.string.repeat';
import WeakSet from '@ungap/weakset';
window.WeakSet = WeakSet;

import smoothscroll from 'smoothscroll-polyfill';

// kick off the polyfill!
smoothscroll.polyfill();

/**
 * closest() polyfill
 * @link https://developer.mozilla.org/en-US/docs/Web/API/Element/closest#Polyfill
 */
if (window.Element && !Element.prototype.closest) {
  Element.prototype.closest = function(s) {
    var matches = (this.document || this.ownerDocument).querySelectorAll(s),
      i,
      el = this;
    do {
      i = matches.length;
      while (--i >= 0 && matches.item(i) !== el) {}
    } while (i < 0 && (el = el.parentElement));
    return el;
  };
}

if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

let polyfills = [];

// // Detect Shadow Dom Support
if (
  !(
    'attachShadow' in Element.prototype && 'getRootNode' in Element.prototype
  ) ||
  (window.ShadyDOM && window.ShadyDOM.force)
) {
  polyfills.push('sd');
}

if (!window.customElements || window.customElements.forcePolyfill) {
  polyfills.push('ce');
}

// NOTE: any browser that does not have template or ES6 features
// must load the full suite (called `lite` for legacy reasons) of polyfills.
if (
  // https://stackoverflow.com/a/21825207 - IE 11 check
  (!!window.MSInputMethodContext && !!document.documentMode) ||
  !('content' in document.createElement('template')) ||
  !window.Promise ||
  !Array.from ||
  // Edge has broken fragment cloning which means you cannot clone template.content
  !(document.createDocumentFragment().cloneNode() instanceof DocumentFragment)
) {
  polyfills = ['lite'];
}

export const polyfillLoader = new Promise(resolve => {
  if (
    polyfills.includes('ce') ||
    polyfills.includes('sd') ||
    polyfills.includes('lite') ||
    void 0 === window.Reflect || // eslint-disable-line
    void 0 === window.customElements || // eslint-disable-line
    window.customElements.hasOwnProperty('polyfillWrapFlushCallback') ||
    window.customElements.nativeShimLoaded === true
  ) {
    resolve();
  } else {
    import('@webcomponents/custom-elements/src/native-shim.js').then(() => {
      resolve();
    });
  }
});
