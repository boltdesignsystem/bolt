import { polyfillLoader } from '@bolt/core';

polyfillLoader.then(() => {
  import('./navlink.js');
});
