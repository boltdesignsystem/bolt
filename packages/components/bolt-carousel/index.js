import { polyfillLoader } from '@bolt/core/polyfills';

polyfillLoader.then(res => {
  import(
    /* webpackChunkName: 'bolt-carousel' */
    /* webpackMode: 'lazy' */
    /* webpackPreload: true */
    './src/carousel'
  );
});
