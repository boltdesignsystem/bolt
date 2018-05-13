import { polyfillLoader } from '@bolt/core';

polyfillLoader.then((res) => {
  import(
    /* webpackChunkName: "bolt-tooltip" */
    /* webpackPrefetch: true */
    './tooltip.standalone.js',
  );
});