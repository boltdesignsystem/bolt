// import './safari.nomodule.js';
// import '@bolt/components-icon';
// import '@bolt/components-image';



// Web ComponentsJS shim order (after es5-web-components-adapter loaded)
// import '../node_modules/@webcomponents/webcomponents-platform/webcomponents-platform.js';
// import '../node_modules/@webcomponents/template/template.js';
// import '../src/promise.js';
// import '../node_modules/@webcomponents/html-imports/src/html-imports.js';
// import '../src/pre-polyfill.js';
// import '../node_modules/@webcomponents/shadydom/src/shadydom.js';
// import '../node_modules/@webcomponents/custom-elements/src/custom-elements.js';
// import '../node_modules/@webcomponents/shadycss/entrypoints/scoping-shim.js';
// import '../src/post-polyfill.js';
// import '../src/unresolved.js';








// NOTE!!!
//
// We have to load polyfills directly from source as non-minified files are not
// published by the polyfills. An issue was raised to discuss this problem and
// to see if it can be resolved.
//
// See https://github.com/webcomponents/custom-elements/issues/45

// ES2015 polyfills required for the polyfills to work in older browsers.
// require('array.from').shim();
// require('object.assign').shim();
// require('es6-promise').polyfill();

// // We have to include this first so that it can patch native. This must be done
// // before any polyfills are loaded.
// // require('./native-shim');

// // Template polyfill is necessary to use shadycss in IE11
// // this comes before custom elements because of
// // https://github.com/webcomponents/template/blob/master/template.js#L39
// require('@webcomponents/template');

// // This comes after the native shim because it requries it to be patched first.
// require('@webcomponents/custom-elements');
// // import 'document-register-element';

// // Force the polyfill in Safari 10.0.0 and 10.0.1.
// const { navigator } = window;
// const { userAgent } = navigator;
// const safari = userAgent.indexOf('Safari/60') !== -1;
// const safariVersion = safari && userAgent.match(/Version\/([^\s]+)/)[1];
// const safariVersions = [0, 1].map(v => `10.0.${v}`).concat(['10.0']);

// if (safari && safariVersions.indexOf(safariVersion) > -1) {
//   window.ShadyDOM = { force: true };
// }

// // ShadyDOM comes first. Both because it may need to be forced and the
// // ShadyCSS polyfill requires it to function.
// require('cloudydom');
// require('@webcomponents/shadycss/scoping-shim.min');
// require('@webcomponents/shadycss/apply-shim.min');
// require('@webcomponents/shadycss/custom-style-interface.min');


// import '@webcomponents/custom-elements/src/custom-elements.js';
// import '../src/post-polyfill.js';


// Start post polyfill 
// let customElements = window['customElements'];
// // let HTMLImports = window['HTMLImports'];
// let Template = window['HTMLTemplateElement'];

// global for (1) existence means `WebComponentsReady` will file,
// (2) WebComponents.ready == true means event has fired.
// window.WebComponents = window.WebComponents || {};

// if (customElements && customElements['polyfillWrapFlushCallback']) {
//   // Here we ensure that the public `HTMLImports.whenReady`
//   // always comes *after* custom elements have upgraded.
//   let flushCallback;
//   let runAndClearCallback = function runAndClearCallback() {
//     if (flushCallback) {
//       // make sure to run the HTMLTemplateElement polyfill before custom elements upgrade
//       if (Template.bootstrap) {
//         Template.bootstrap(window.document);
//       }
//       let cb = flushCallback;
//       flushCallback = null;
//       cb();
//       return true;
//     }
//   }
//   let origWhenReady = HTMLImports['whenReady'];
//   customElements['polyfillWrapFlushCallback'](function (cb) {
//     flushCallback = cb;
//     origWhenReady(runAndClearCallback);
//   });

//   HTMLImports['whenReady'] = function (cb) {
//     origWhenReady(function () {
//       // custom element code may add dynamic imports
//       // to match processing of native custom elements before
//       // domContentLoaded, we wait for these imports to resolve first.
//       if (runAndClearCallback()) {
//         HTMLImports['whenReady'](cb);
//       } else {
//         cb();
//       }
//     });
//   }

// }

// HTMLImports['whenReady'](function () {
//   requestAnimationFrame(function () {
//     window.WebComponents.ready = true;
//     document.dispatchEvent(new CustomEvent('WebComponentsReady', { bubbles: true }));
//   });
// });


// import '../src/unresolved.js';

// import '@webcomponents/webcomponentsjs/webcomponents-hi-sd-ce.js';
// import 'core-js/es6/object';
// import 'core-js/es6/array';
// import 'core-js/es6/promise';

// import './bolt-app.js';

import './safari.nomodule.js';
import '@bolt/components-icon';
import '@bolt/components-image';
// import '@webcomponents/custom-elements/src/native-shim.js';