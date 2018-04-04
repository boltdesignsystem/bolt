
/**
   * 1. Workaround to prevent double `@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js` polyfills
   * from getting loaded in Chrome if a Bolt build and a namespaced PW build
   * get loaded at the same time.
   */
if (window.customElements) { /* [1] */
  window.customElements.forcePolyfill = true;
}

import '@bolt/global/styles/05-objects/objects-ratio/ratio.js';
import './components/pw-video/pw-video.js';
