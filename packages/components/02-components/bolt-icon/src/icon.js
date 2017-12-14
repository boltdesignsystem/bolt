// require('es6-promise').polyfill();
// require("core-js/modules/es6.array.iterator");
// require('core-js/modules/es6.symbol');
// require("core-js/modules/es6.array.from");


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
//   import(/* webpackMode: "eager" */ './icon.standalone.js');
// }



import { polyfillLoader } from '@bolt/core';

polyfillLoader.then((res) => {
  // import('@bolt/components-image/src/image.js');
  import('./icon.standalone.js');
  // import('@bolt/components-device-viewer/src/device-viewer.standalone.js');
  // Promise.all([
  //   import('@bolt/components-image/src/image.js'),
  //   import('@bolt/components-device-viewer/src/device-viewer.standalone.js'),
  //   import('@bolt/components-icon/src/icon.standalone.js')
  // ])
});