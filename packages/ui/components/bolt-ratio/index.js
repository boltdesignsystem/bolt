import { polyfillLoader } from '@bolt/core';

polyfillLoader.then(() => {
  import(
    /* webpackMode: 'eager', webpackChunkName: 'bolt-ratio' */ './src/ratio.js'
  );
});
