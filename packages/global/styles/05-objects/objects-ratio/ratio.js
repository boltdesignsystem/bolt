import { polyfillLoader } from '@bolt/core';

polyfillLoader.then((res) => {
  import('./ratio.standalone.js');
});