import { polyfillLoader } from '@bolt/core';

polyfillLoader.then((res) => {
  import(
    /* webpackChunkName: "bolt-icon" */
    /* webpackPreload: true */
    './icon.standalone.js',
  );
});