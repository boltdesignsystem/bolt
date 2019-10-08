import { polyfillLoader } from '@bolt/core/polyfills';

polyfillLoader.then(res => {
  import(
    /* webpackChunkName: 'bolt-device-viewer' */
    /* webpackMode: 'eager' */
    './device-viewer.standalone.js'
  );
});
