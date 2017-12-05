import { polyfillLoader } from '@bolt/core';

polyfillLoader.then((res) => {
  // import('@bolt/components-image/src/image.js');
  import('./video.standalone.js');
  // import('@bolt/components-device-viewer/src/device-viewer.standalone.js');
  // Promise.all([
  //   import('@bolt/components-image/src/image.js'),
  //   import('@bolt/components-device-viewer/src/device-viewer.standalone.js'),
  //   import('@bolt/components-icon/src/icon.standalone.js')
  // ])
});