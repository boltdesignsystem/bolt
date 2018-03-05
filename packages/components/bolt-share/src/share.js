import { polyfillLoader } from '@bolt/core';

polyfillLoader.then((res) => {
  import('./share.standalone.js');
});