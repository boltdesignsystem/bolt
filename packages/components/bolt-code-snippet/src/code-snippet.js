import { polyfillLoader } from '@bolt/core/polyfills';

polyfillLoader.then(() => {
  import(
    /* webpackChunkName: 'bolt-code-snippet' */
    /* webpackMode: 'eager' */
    './code-snippet.standalone.js'
  );
});
