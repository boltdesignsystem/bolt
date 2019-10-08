import { polyfillLoader } from '@bolt/core/polyfills';

polyfillLoader.then(res => {
  import(
    /* webpackChunkName: 'bolt-chip' */
    /* webpackMode: 'eager' */
    './src/chip'
  );
});
