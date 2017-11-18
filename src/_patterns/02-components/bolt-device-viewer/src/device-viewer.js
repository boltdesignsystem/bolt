require('es6-promise').polyfill();
require("core-js/modules/es6.array.iterator");
require('core-js/modules/es6.symbol');
require("core-js/modules/es6.array.from");


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
  import(/* webpackMode: "eager" */ './device-viewer.standalone.js');
}
