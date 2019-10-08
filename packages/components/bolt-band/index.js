import { polyfillLoader } from '@bolt/core/polyfills';

polyfillLoader.then(res => {
  import(
    /* webpackChunkName: 'bolt-band' */
    /* webpackMode: 'lazy' */
    /* webpackPreload: true */
    './src/band'
  );
});
