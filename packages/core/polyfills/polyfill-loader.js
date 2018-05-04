import './custom-event-polyfill';

if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}


let polyfills = [];

// // Detect Shadow Dom Support
if (!('attachShadow' in Element.prototype && 'getRootNode' in Element.prototype) ||
  (window.ShadyDOM && window.ShadyDOM.force)) {
  polyfills.push('sd');
}


if (!window.customElements || window.customElements.forcePolyfill) {
  polyfills.push('ce');
}

// NOTE: any browser that does not have template or ES6 features
// must load the full suite (called `lite` for legacy reasons) of polyfills.
if (!('content' in document.createElement('template')) || !window.Promise || !Array.from ||
  // Edge has broken fragment cloning which means you cannot clone template.content
  !(document.createDocumentFragment().cloneNode() instanceof DocumentFragment)) {
  polyfills = ['lite'];
}


export const polyfillLoader = new Promise((resolve) => {
  // Based on https://github.com/webcomponents/webcomponentsjs/blob/master/entrypoints/webcomponents-hi-sd-ce-pf-index.js
  // Used in: IE 11
  if (polyfills.includes('lite')) {
    import('es6-promise').polyfill();

    Promise.all([
      import('core-js/modules/es6.array.iterator'),
      import('core-js/modules/es6.symbol'),
      import('core-js/modules/es6.array.from'),
      import('core-js/modules/es6.string.starts-with'),
      import('core-js/modules/es7.array.includes'),
      import('core-js/modules/es6.array.for-each'),
      import('core-js/modules/es6.object.assign'),
      import('core-js/library/es6/reflect'),
      import('document-register-element'),
    ]).then(() => { resolve() });
  }

  // Based on https://github.com/webcomponents/webcomponentsjs/blob/master/entrypoints/webcomponents-sd-ce-index.js
  // Used in: Safari 9, Firefox, Edge
  else if (polyfills.includes('sd') && polyfills.includes('ce')) {
    Promise.all([
      import('@webcomponents/shadydom/src/shadydom.js'),
      import('document-register-element'),
      import('@webcomponents/shadycss/entrypoints/scoping-shim.js'),
    ]).then(() => { resolve() });
  }

  // Based on https://github.com/webcomponents/webcomponentsjs/blob/master/entrypoints/webcomponents-hi-sd-index.js
  // Used in: Firefox with CustomElements enabled
  else if (polyfills.includes('sd')) {
    Promise.all([
      import('@webcomponents/shadydom/src/shadydom.js'),
      import('@webcomponents/shadycss/entrypoints/scoping-shim.js'),
    ]).then(() => { resolve() });
  }

  // Based on https://github.com/webcomponents/webcomponentsjs/blob/master/entrypoints/webcomponents-hi-ce-index.js
  // Used in: Safari 10, Firefox once SD is shipped
  else if (polyfills.includes('ce')) {
    Promise.all([
      import('@webcomponents/shadydom/src/shadydom.js'),
      import('@webcomponents/shadycss/entrypoints/scoping-shim.js'),
    ]).then(() => { resolve() });

    import('document-register-element').then(() => { resolve() });
  }

  // Used in Modern browsers supporting ES6. Required since we're transpiling ES6 classes through Babel
  else {
    import('@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js').then(() => { resolve() });
  }
});
