import { polyfillLoader } from '@bolt/core-v3.x/polyfills';

polyfillLoader.then(() => {
  import(
    /* webpackMode: 'eager', webpackChunkName: 'bolt-ratio' */ './src/ratio.js'
  );
});
