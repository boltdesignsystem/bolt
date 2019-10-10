import { polyfillLoader } from '@bolt/core/polyfills';

polyfillLoader.then(() => {
  import(
    /* webpackMode: 'eager' */
    './nav-priority.js'
  );
});
