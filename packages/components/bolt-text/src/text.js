import { polyfillLoader } from '@bolt/core/polyfills';

polyfillLoader.then(res => {
  import('./text.standalone.js');
});
