import { polyfillLoader } from '@bolt/core/polyfills';

polyfillLoader.then(res => {
  import(
    /* webpackChunkName: 'bolt-block-list' */
    /* webpackMode: 'lazy' */
    /* webpackPreload: true */
    './block-list.standalone.js'
  );
});
