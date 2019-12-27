import { polyfillLoader } from '@bolt/core-v3.x/polyfills';

polyfillLoader.then(() => {
  import('./navlink.js');
});
