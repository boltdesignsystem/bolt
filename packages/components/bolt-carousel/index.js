import { polyfillLoader } from '@bolt/core/polyfills';

polyfillLoader.then(res => {
  import(
    /* webpackChunkName: 'bolt-carousel' */
    /* webpackMode: 'eager' */
    './src/carousel'
  );
});
