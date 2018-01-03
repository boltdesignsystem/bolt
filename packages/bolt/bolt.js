// Temporarily disabling ratio JS on both builds -- IE11 issue being debugged

import { polyfillLoader } from '@bolt/core';

polyfillLoader.then(res => {
  import(/* webpackMode: 'lazy', webpackChunkName: 'bolt-ratio-object' */ '@bolt/objects-ratio/src/ratio.standalone');

  import(/* webpackMode: 'lazy', webpackChunkName: 'bolt-device-viewer' */ '@bolt/components-device-viewer/src/device-viewer.standalone');

  import(/* webpackMode: 'lazy', webpackChunkName: 'bolt-band' */ '@bolt/components-band/src/band.standalone');

  import(/* webpackMode: 'lazy', webpackChunkName: 'bolt-band-collection' */ '@bolt/components-band/src/band-collection.standalone');

  import(/* webpackMode: 'lazy', webpackChunkName: 'bolt-icon' */ '@bolt/components-icon/src/icon.standalone');

  import(/* webpackMode: 'eager', webpackChunkName: 'bolt-image' */ '@bolt/components-image/src/image');

  import(/* webpackMode: 'lazy', webpackChunkName: 'bolt-nav-bar' */ '@bolt/components-nav-bar/src/nav-bar.standalone');

  import(/* webpackMode: 'lazy', webpackChunkName: 'bolt-button' */ '@bolt/components-button/src/button.standalone');

  import(/* webpackMode: 'lazy', webpackChunkName: 'bolt-smooth-scroll' */ '@bolt/components-smooth-scroll/src/smooth-scroll');

  import(/* webpackMode: 'lazy', webpackChunkName: 'bolt-sticky' */ '@bolt/components-sticky/src/sticky');

  import(/* webpackMode: 'lazy', webpackChunkName: 'bolt-video' */ '@bolt/components-video/src/video.standalone');
});
