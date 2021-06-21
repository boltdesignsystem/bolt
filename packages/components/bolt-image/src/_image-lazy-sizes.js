// temporarily use local pre-patched version of lazysizes
// @todo: replace this with a proper fork or improved patch-package workflow
import lazySizes from './lazysizes.js';

// import 'lazysizes/src/lazysizes-intersection';
import 'lazysizes/plugins/unveilhooks/ls.unveilhooks';
import 'lazysizes/plugins/progressive/ls.progressive';
import 'lazysizes/plugins/respimg/ls.respimg'; // Lighter weight version of picturefill

// https://github.com/aFarkas/lazysizes/issues/410
// lazySizes.cfg == window.lazySizesConfig
Object.assign(lazySizes.cfg, {
  lazyClass: 'js-lazyload',
  preloadClass: 'js-lazypreload',
  loadingClass: 'is-lazyloading',
  loadedClass: 'is-lazyloaded',
  preloadAfterLoad: false,
  loadMode: 2,
  expand: 500,
  // helper function to customize how / which elements lazysizes targets
  getElements(selector) {
    let elements = Array.from(
      document.querySelectorAll('bolt-image'),
    ).map(elem =>
      elem.renderRoot
        ? elem.renderRoot.querySelector(selector)
        : elem.querySelector(selector),
    );
    elements = elements.filter(function(el) {
      return el != null;
    });
    return elements;
  },
});

export { lazySizes };
