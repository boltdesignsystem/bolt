require('es6-promise').polyfill();
require('core-js/modules/es6.array.iterator');
require('core-js/modules/es6.symbol');
require('core-js/modules/es6.array.from');

export const polyfillLoader = new Promise(function (resolve, reject) {
  if (window.customElements !== undefined) {
    Promise.all([
      import(/* webpackChunkName: "custom-elements-es5-adapter" */ '@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js'),
      import(/* webpackChunkName: "wc-polyfill-sd" */ './wc-polyfill-sd')
    ]).then(() => {
      resolve();
    });
  } else {
    Promise.all([
      import(/* webpackChunkName: "wc-polyfill-ce-sd" */ './wc-polyfill-ce-sd')
    ]).then(() => {
      resolve();
    });
  }
});
