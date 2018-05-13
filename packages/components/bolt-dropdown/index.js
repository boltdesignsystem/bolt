import { polyfillLoader } from '@bolt/core';

polyfillLoader.then((res) => {
  import(
    /* webpackChunkName: "bolt-dropdown" */
    /* webpackPrefetch: true */
    './dropdown.js',
  );
});