// (function (arr) {
//   arr.forEach(function (item) {
//     if (item.hasOwnProperty('remove')) {
//       return;
//     }
//     Object.defineProperty(item, 'remove', {
//       configurable: true,
//       enumerable: true,
//       writable: true,
//       value: function remove() {
//         this.parentNode.removeChild(this);
//       }
//     });
//   });
// })([Element.prototype, CharacterData.prototype, DocumentType.prototype]);

// require('es6-promise').polyfill();
// require("core-js/modules/es6.array.iterator");
// require("core-js/modules/es6.array.from");
// require("core-js/modules/es7.array.includes");
// require('core-js/modules/es6.symbol');
// // import "babel-polyfill";
// // require('array.from').shim();
// // require('object.assign').shim();
// // window.Symbol = require('es6-symbol');

// if (window.customElements !== undefined) {
//   Promise.all([
//     import(/* webpackMode: "lazy", webpackChunkName: "bolt-wc-polyfill--es5-adapter" */ '@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js'),
//     import(/* webpackMode: "lazy", webpackChunkName: "bolt-wc-polyfill--sd" */ './wc-polyfill-sd'),
//   ])
//     .then(() => {
//       continueLoading();
//     });
// } else {
//   Promise.all([
//     import(/* webpackMode: "lazy", webpackChunkName: "bolt-wc-polyfill--ce-sd" */ './wc-polyfill-ce-sd'),
//   ])
//     .then(() => {
//       continueLoading();
//     });
// }

// function continueLoading() {
//   require('./card.standalone.js');
// }
