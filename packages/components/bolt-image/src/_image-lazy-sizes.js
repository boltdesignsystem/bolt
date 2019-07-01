import lazySizes from 'lazysizes/lazysizes.js'; // Mostly just for automatic `size` attribute support
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
  getElements(selector) {
    let elements = Array.from(document.querySelectorAll('bolt-image')).map(
      elem => elem.renderRoot.querySelector(selector),
    );
    elements = elements.filter(function(el) {
      return el != null;
    });
    return elements;
  },
});
