import { polyfillLoader } from '@bolt/core/polyfills';

polyfillLoader.then(() => {
  import('./nav-priority.js');
});
