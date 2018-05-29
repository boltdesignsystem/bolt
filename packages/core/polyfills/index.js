import 'es6-promise/auto';
import 'core-js/modules/es6.object.assign';
import 'core-js/modules/es7.array.includes';
// import 'core-js/modules/es6.array.iterator';
// import 'core-js/modules/es6.array.from';
// import 'core-js/modules/es6.string.starts-with';
// import 'core-js/modules/es6.array.for-each';
// import './custom-event-polyfill';


if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}


var polyfillsLoaded = false;
var whenLoadedFns = [];
var allowUpgrades = false;
var flushFn;


function fireEvent() {
  window.WebComponents.ready = true;
  document.dispatchEvent(new CustomEvent('WebComponentsReady', {
    bubbles: true,
  }));
}


function batchCustomElements() {
  if (window.customElements && customElements.polyfillWrapFlushCallback) {
    customElements.polyfillWrapFlushCallback(function (flushCallback) {
      flushFn = flushCallback;
      if (allowUpgrades) {
        flushFn();
      }
    });
  }
}

function asyncReady(callback, batchCE = true) {
  if (batchCE){
    batchCustomElements();
  }
  ready();
  callback();
}

function ready() {
  // bootstrap <template> elements before custom elements
  if (window.HTMLTemplateElement && HTMLTemplateElement.bootstrap) {
    HTMLTemplateElement.bootstrap(window.document);
  }
  polyfillsLoaded = true;
  runWhenLoadedFns().then(fireEvent);
}

function runWhenLoadedFns() {
  allowUpgrades = false;
  var done = function () {
    allowUpgrades = true;
    whenLoadedFns.length = 0;
    flushFn && flushFn();
  };
  return Promise.all(whenLoadedFns.map(function (fn) {
    return fn instanceof Function ? fn() : fn;
  })).then(function () {
    done();
  }).catch(function (err) {
    console.error(err);
  });
}

window.WebComponents = window.WebComponents || {
  ready: false,
  _batchCustomElements: batchCustomElements,
  waitFor (waitFn) {
    if (!waitFn) {
      return;
    }
    whenLoadedFns.push(waitFn);
    if (polyfillsLoaded) {
      runWhenLoadedFns();
    }
  },
};

let polyfills = [];

// // Detect Shadow Dom Support
if (!('attachShadow' in Element.prototype && 'getRootNode' in Element.prototype) ||
  (window.ShadyDOM && window.ShadyDOM.force)) {
  polyfills.push('sd');
}

var needsTemplate = (function() {
  // no real <template> because no `content` property (IE and older browsers)
  var t = document.createElement('template');
  if (!('content' in t)) {
    return true;
  }
  // broken doc fragment (older Edge)
  if (!(t.content.cloneNode() instanceof DocumentFragment)) {
    return true;
  }
  // broken <template> cloning (Edge up to at least version 17)
  var t2 = document.createElement('template');
  t2.content.appendChild(document.createElement('div'));
  t.content.appendChild(t2);
  var clone = t.cloneNode(true);
  return (clone.content.childNodes.length === 0 ||
      clone.content.firstChild.content.childNodes.length === 0);
})();

if (!window.Promise || !Array.from || !window.URL || !window.Symbol || needsTemplate) {
  polyfills = ['lite'];
}

if (!window.customElements || window.customElements.forcePolyfill) {
  polyfills.push('ce');
}



export const polyfillLoader = new Promise((resolve) => {

  // Based on https://github.com/webcomponents/webcomponentsjs/blob/master/entrypoints/webcomponents-hi-sd-ce-pf-index.js
  // Used in: IE 11
  if (polyfills.includes('lite')) {
    Promise.all([
      import('core-js/modules/es6.array.iterator'),
      import('core-js/modules/es6.array.from'),
      import('core-js/modules/es6.string.starts-with'),
      import('core-js/modules/es6.array.for-each'),
      import('./custom-event-polyfill'),
      import(
        /* webpackChunkName: "custom-element-polyfill" */
        '@webcomponents/custom-elements/src/custom-elements',
      ),
    ]).then(() => {
      asyncReady(resolve);
    });
  }

  // Based on https://github.com/webcomponents/webcomponentsjs/blob/master/entrypoints/webcomponents-sd-ce-index.js
  // Used in: Safari 9, Firefox, Edge
  else if ( polyfills.includes('sd') && polyfills.includes('ce') ){
    Promise.all([
      import(
        /* webpackChunkName: "shadydom-polyfill" */
        '@webcomponents/shadydom/src/shadydom.js',
      ),
      import(
        /* webpackChunkName: "custom-element-polyfill" */
        '@webcomponents/custom-elements/src/custom-elements',
      ),
    ]).then(() => { asyncReady(resolve) });
  }

  // Based on https://github.com/webcomponents/webcomponentsjs/blob/master/entrypoints/webcomponents-sd-index.js
  // Used in: Firefox with CustomElements enabled
  else if (polyfills.includes('sd')) {
    Promise.all([
      import(
        /* webpackChunkName: "shadydom-polyfill" */
        '@webcomponents/shadydom/src/shadydom.js',
      ),
    ]).then(() => { asyncReady(resolve) });
  }

  // Based on https://github.com/webcomponents/webcomponentsjs/blob/master/entrypoints/webcomponents-ce-index.js
  // Used in: Safari 10, Firefox once SD is shipped
  else if (polyfills.includes('ce')){
    Promise.all([
      import(
        /* webpackChunkName: "custom-element-polyfill" */
        '@webcomponents/custom-elements/src/custom-elements',
      ),
    ]).then(() => { asyncReady(resolve) });
  }

  // Used in Modern browsers supporting ES6. Required since we're transpiling ES6 classes through Babel
  else {
    import(
      /* webpackChunkName: "custom-elements-es5-adapter" */
      /* webpackPrefetch: true */
      'document-register-element',
      // '@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js',
    ).then(() => {
      asyncReady(resolve, false);
    });
  }
});
