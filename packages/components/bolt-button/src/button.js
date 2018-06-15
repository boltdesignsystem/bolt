import { polyfillLoader } from '@bolt/core';

polyfillLoader.then((res) => {
  import(
    /* webpackChunkName: "bolt-button" */
    /* webpackPreload: true */
    './button.standalone.js',
  );
});