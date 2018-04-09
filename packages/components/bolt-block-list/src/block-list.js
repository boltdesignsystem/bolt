import { polyfillLoader } from '@bolt/core';

polyfillLoader.then((res) => {
  import('./block-list.standalone.js');
});