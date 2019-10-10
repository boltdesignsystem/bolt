import { polyfillLoader } from '@bolt/core/polyfills';

polyfillLoader.then(res => {
  import(
    /* webpackChunkName: 'bolt-block-list' */
    /* webpackMode: 'eager' */
    './block-list.standalone.js'
  );
});
