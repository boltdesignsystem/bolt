// @todo: remove this import once the ES Module work is merged in + migration place for existing external use of polyfills in place
import '@bolt/polyfills';

let polyfills = [];

// Detect Shadow Dom Support
if (
  !(
    'attachShadow' in Element.prototype && 'getRootNode' in Element.prototype
  ) ||
  (window.ShadyDOM && window.ShadyDOM.force)
) {
  polyfills.push('sd');
}

if (!window.customElements || window.customElements.forcePolyfill) {
  polyfills.push('ce');
}

// NOTE: any browser that does not have template or ES6 features
// must load the full suite (called `lite` for legacy reasons) of polyfills.
if (
  // https://stackoverflow.com/a/21825207 - IE 11 check
  (!!window.MSInputMethodContext && !!document.documentMode) ||
  !('content' in document.createElement('template')) ||
  !window.Promise ||
  !Array.from ||
  // Edge has broken fragment cloning which means you cannot clone template.content
  !(document.createDocumentFragment().cloneNode() instanceof DocumentFragment)
) {
  polyfills = ['lite'];
}

export const polyfillLoader = new Promise(resolve => {
  if (
    polyfills.includes('ce') ||
    polyfills.includes('sd') ||
    polyfills.includes('lite') ||
    void 0 === window.Reflect || // eslint-disable-line
    void 0 === window.customElements || // eslint-disable-line
    window.customElements.hasOwnProperty('polyfillWrapFlushCallback') ||
    window.customElements.nativeShimLoaded === true
  ) {
    resolve();
  } else {
    resolve();
  }
});
