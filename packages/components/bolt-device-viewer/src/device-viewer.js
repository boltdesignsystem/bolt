import { polyfillLoader } from '@bolt/core';

polyfillLoader.then((res) => {
  import(/* webpackChunkName: 'bolt-device-viewer' */ './device-viewer.standalone.js');
});