import { polyfillLoader } from '@bolt/core';

polyfillLoader.then((res) => {
  import('./bolt-collapse.standalone.js');
});
