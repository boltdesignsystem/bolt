import { polyfillLoader } from '@bolt/core';

polyfillLoader.then((res) => {
  import('./tooltip.standalone.js');
});