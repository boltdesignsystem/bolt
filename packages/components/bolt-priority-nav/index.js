import { polyfillLoader } from '@bolt/core';

polyfillLoader.then(() => {
  import('./priority-nav.js');
});
