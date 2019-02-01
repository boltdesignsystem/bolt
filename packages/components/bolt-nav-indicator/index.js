import { polyfillLoader } from '@bolt/core/polyfills';

polyfillLoader.then(() => {
  import('./nav-indicator.js');
});
