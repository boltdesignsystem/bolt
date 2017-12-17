// import '@bolt/components-image/src/image.js';
// import '@bolt/components-device-viewer/src/device-viewer.js';
// import '@bolt/components-icon/src/icon.js'; //Required - otherwise the `dist` version would get included by default which would result in double shimming. @TODO: abstract web components polyfills into separate require.ensure call
// import '@bolt/components-nav-bar/src/nav-bar.js';
// import '@bolt/components-smooth-scroll/src/smooth-scroll.js';
// // import '@bolt/components-card/src/card.js';


import { polyfillLoader } from '@bolt/core';

polyfillLoader.then((res) => {
  import('@bolt/components-icon');
  // import('@bolt/components-image/src/image.js');
});