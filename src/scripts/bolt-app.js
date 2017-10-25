import "babel-polyfill";
// require('array.from').shim();
// require('object.assign').shim();
// require('es6-promise').polyfill();
// window.Symbol = require('es6-symbol');

if (window.customElements !== undefined) {
  require.ensure([], function () {
    require('@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js');
    require('@webcomponents/shadydom/src/shadydom.js');
    require('@webcomponents/shadycss/entrypoints/scoping-shim.js');
    // require('@webcomponents/webcomponentsjs/webcomponents-sd-ce.js');
    // require('@webcomponents/shadycss/scoping-shim.min');
    // require('@webcomponents/shadycss/apply-shim.min');
    // require('@webcomponents/shadycss/custom-style-interface.min');
    // import '@webcomponents/custom-elements/src/custom-elements.js';
    continueLoading();
  });
} else {
  require.ensure([], function () {
    require('@webcomponents/shadydom/src/shadydom.js');
    require('@webcomponents/template/template.js');
    require('@webcomponents/custom-elements');
    require('@webcomponents/shadycss/entrypoints/scoping-shim.js');
    continueLoading();
  });
}

function continueLoading(){
  require('./bolt-main.js');
}

