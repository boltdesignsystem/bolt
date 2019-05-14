import { polyfillLoader } from '@bolt/core/polyfills';

polyfillLoader.then(res => {
  import('./src/tooltip.js');
});
