import { polyfillLoader } from '@bolt/core';

polyfillLoader.then((res) => {
  import('./text.standalone.js');
});