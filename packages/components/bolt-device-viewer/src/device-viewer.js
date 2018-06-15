import { polyfillLoader } from '@bolt/core';

polyfillLoader.then((res) => {
  import(
    /* webpackChunkName: "bolt-device-viewer" */
    /* webpackPrefetch: true */
    './device-viewer.standalone.js',
  );
});

