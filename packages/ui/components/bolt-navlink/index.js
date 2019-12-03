import { polyfillLoader } from '@bolt/core/polyfills';

polyfillLoader.then(() => {
  import('./navlink.js');
});
