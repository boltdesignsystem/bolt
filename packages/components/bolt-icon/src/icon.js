import { polyfillLoader } from '@bolt/core';

polyfillLoader.then((res) => {
  import('./icon.standalone.js');
});
