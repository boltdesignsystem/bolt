import { polyfillLoader } from '@bolt/core/polyfills';

polyfillLoader.then(res => {
  import('./tooltip.standalone.js');
});
