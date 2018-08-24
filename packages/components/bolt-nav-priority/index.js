import { polyfillLoader } from '@bolt/core';

polyfillLoader.then(() => {
  import('./nav-priority.js');
});
