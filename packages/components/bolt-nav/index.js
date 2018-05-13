import { polyfillLoader } from '@bolt/core';

polyfillLoader.then((res) => {
  import(
    /* webpackChunkName: "bolt-nav" */
    /* webpackPrefetch: true */
    './nav.js',
  );
});