import { polyfillLoader } from '@bolt/core/polyfills';

polyfillLoader.then(res => {
  import(
    /* webpackChunkName: 'bolt-chip' */
    /* webpackMode: 'lazy' */
    /* webpackPreload: true */
    './src/chip'
  );
});
