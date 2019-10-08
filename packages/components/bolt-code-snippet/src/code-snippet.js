import { polyfillLoader } from '@bolt/core/polyfills';

polyfillLoader.then(() => {
  import(
    /* webpackChunkName: 'bolt-code-snippet' */
    /* webpackMode: 'lazy' */
    /* webpackPreload: true */
    './code-snippet.standalone.js'
  );
});
