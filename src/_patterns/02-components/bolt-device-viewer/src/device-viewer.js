import { polyfillLoader } from '@bolt/core';

polyfillLoader.then((res) => {
  import('./device-viewer.standalone.js');
});
