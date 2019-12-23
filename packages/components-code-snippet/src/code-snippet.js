import { polyfillLoader } from '@bolt/core-v3.x/polyfills';

polyfillLoader.then(() => {
  import(
    /* webpackChunkName: 'bolt-code-snippet' */ './code-snippet.standalone.js'
  );
});
