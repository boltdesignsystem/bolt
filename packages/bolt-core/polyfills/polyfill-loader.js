require('es6-promise').polyfill();
require('core-js/modules/es6.array.iterator');
require('core-js/modules/es6.symbol');
require('core-js/modules/es6.array.from');
require('core-js/modules/es7.array.includes');
require('core-js/modules/es6.array.for-each');

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




export const polyfillLoader = new Promise(function (resolve, reject) {
  if (window.customElements !== undefined) {
    Promise.all([
      import(/* webpackChunkName: "webcomponents-sd-ce" */ './wc-polyfill-ce-sd.js')
    ]).then(() => {
      resolve();
    });
  } else {
    Promise.all([
      import(/* webpackChunkName: "webcomponents-lite" */ './webcomponents-hi-sd-ce-pf-index.js')
    ]).then(() => {
      resolve();
    });
  }
});
