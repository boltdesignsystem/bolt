import { polyfillLoader } from '@bolt/core';

polyfillLoader.then((res) => {
  import('./band-collection.standalone.js');
});