require('es6-promise').polyfill();

import "babel-polyfill";
// require('array.from').shim();
// require('object.assign').shim();
// window.Symbol = require('es6-symbol');



if (window.customElements !== undefined) {
  Promise.all([
    import(/* webpackMode: "lazy", webpackChunkName: "bolt-wc-polyfill--es5-adapter" */ '@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js'),
    import(/* webpackMode: "lazy", webpackChunkName: "bolt-wc-polyfill--sd" */ './wc-polyfill-sd'),
  ])
    .then(() => {
      continueLoading();
    });
} else {
  Promise.all([
    import(/* webpackMode: "lazy", webpackChunkName: "bolt-wc-polyfill--ce-sd" */ './wc-polyfill-ce-sd'),
  ])
    .then(() => {
      continueLoading();
    });
}

function continueLoading() {
  require('./icon.js');
}
