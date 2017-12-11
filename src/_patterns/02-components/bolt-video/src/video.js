import { polyfillLoader } from '@bolt/core';

polyfillLoader.then((res) => {
  import('./video.standalone.js');
});