require('es6-promise').polyfill();
require('core-js/modules/es6.array.iterator');
require('core-js/modules/es6.symbol');
require('core-js/modules/es6.array.from');
require('core-js/modules/es7.array.includes');
require('core-js/modules/es6.array.for-each');
require('core-js/modules/es6.object.assign');
require('core-js/library/es6/reflect');

let polyfills = [];

// ex. NodeList.forEach --> IE 11
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;
    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}


// CustomElement shim for IE 11
(function () {
  if (typeof window.CustomEvent === "function") return false;
  function CustomEvent(event, params) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent('CustomEvent');
  evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
  return evt;
}
  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent;
})();

// Detect Shadow Dom Support
if (!('attachShadow' in Element.prototype && 'getRootNode' in Element.prototype) ||
  (window.ShadyDOM && window.ShadyDOM.force)) {
  polyfills.push('sd');
}


/**
 * Workaround to force the customElements polyfill to
 * get loaded (workaround if the @webcomponents/webcomponentsjs/custom-elements-es5-adapter.js
 * shim might get loaded more than once per page.
 */
if (bolt.customElements.forcePolyfill) {
  polyfills.push('ce');
} else if (!window.customElements || window.customElements.forcePolyfill) {
  polyfills.push('ce');
}

// NOTE: any browser that does not have template or ES6 features
// must load the full suite (called `lite` for legacy reasons) of polyfills.
if (!('content' in document.createElement('template')) || !window.Promise || !Array.from ||
  // Edge has broken fragment cloning which means you cannot clone template.content
  !(document.createDocumentFragment().cloneNode() instanceof DocumentFragment)) {
  polyfills = ['lite'];
}


const webComponentPolyfillPath = `bolt-webcomponents-${polyfills.join('-')}.js`;


export const polyfillLoader = new Promise((resolve) => {
  if (polyfills.length > 0) {
    import(/* webpackChunkName: `${webComponentPolyfillPath}` */ `./${webComponentPolyfillPath}`)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        throw new Error(`Could not load ${webComponentPolyfillPath}. Error: ${error}`);
      });
  } else {
    import(/* webpackChunkName: "custom-elements-es5-adapter" */
      '@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js').then(() => {
        resolve();
      })
      .catch((error) => {
        throw new Error(`Could not load @webcomponents/webcomponentsjs/custom-elements-es5-adapter.js.
        Error: ${error}`);
      });
  }
}).catch((error) => {
  throw new Error(`Error: unexpected polyfill-loader.js error. ${error}`);
});
