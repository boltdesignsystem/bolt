import { polyfillLoader } from '@bolt/core';

polyfillLoader.then((res) => {
  import('./button.js');
});