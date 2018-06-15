import { polyfillLoader } from '@bolt/core';

polyfillLoader.then((res) => {
  import(
    /* webpackChunkName: "bolt-band" */
    /* webpackPreload: true */
    './band.standalone.js',
  );
});