import { polyfillLoader } from '@bolt/core';

polyfillLoader.then((res) => {
  import(
    /* webpackChunkName: "bolt-block-list" */
    /* webpackPrefetch: true */
    './block-list.standalone.js',
  );
});