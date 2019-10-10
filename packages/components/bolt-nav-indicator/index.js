import { polyfillLoader } from '@bolt/core/polyfills';

polyfillLoader.then(() => {
  import(
    /* webpackMode: 'eager' */
    './nav-indicator.js'
  );
});
