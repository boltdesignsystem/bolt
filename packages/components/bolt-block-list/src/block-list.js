import { polyfillLoader } from '@bolt/core/polyfills';

polyfillLoader.then(res => {
  import('./block-list.standalone.js');
});
