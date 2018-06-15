import { polyfillLoader } from '@bolt/core';

polyfillLoader.then((res) => {
  import(
    /* webpackChunkName: "bolt-copy-to-clipboard" */
    /* webpackPrefetch: true */
    './copy-to-clipboard.standalone.js',
  );
});