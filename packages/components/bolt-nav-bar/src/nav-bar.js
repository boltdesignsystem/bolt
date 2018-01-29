import { polyfillLoader } from '@bolt/core';

polyfillLoader.then((res) => {
  import('./nav-bar.standalone.js');
});
