import { polyfillLoader } from '@bolt/core/polyfills';

polyfillLoader.then(res => {
  import(
    /* webpackChunkName: 'bolt-device-viewer' */
    /* webpackMode: 'lazy' */
    /* webpackPreload: true */
    './device-viewer.standalone.js'
  );
});
