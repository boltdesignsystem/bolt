import { polyfillLoader } from '@bolt/core';

polyfillLoader.then((res) => {
  import(
    /* webpackChunkName: "bolt-navlink" */
    /* webpackPrefetch: true */
    './navlink.js',
  );
});