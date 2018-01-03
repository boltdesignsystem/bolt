require('es6-promise').polyfill();
require('core-js/modules/es6.array.iterator');
require('core-js/modules/es6.symbol');
require('core-js/modules/es6.array.from');
require('core-js/modules/es7.array.includes');

export const polyfillLoader = new Promise(function (resolve, reject) {
  if (window.customElements !== undefined) {
    Promise.all([
      import(/* webpackChunkName: "custom-elements-es5-adapter" */ '@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js'),
      import(/* webpackChunkName: "webcomponents-hi-sd-ce" */ '@webcomponents/webcomponentsjs/webcomponents-hi-sd-ce.js')
    ]).then(() => {
      resolve();
    });
  } else {
    Promise.all([
      import(/* webpackChunkName: "webcomponents-lite" */ '@webcomponents/webcomponentsjs/webcomponents-lite.js')
    ]).then(() => {
      resolve();
    });
  }
});
