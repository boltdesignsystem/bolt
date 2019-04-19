import { polyfillLoader } from '@bolt/core/polyfills';

polyfillLoader.then(() => {
  import(
    /* webpackChunkName: 'bolt-code-snippet' */ './code-snippet.standalone.js'
  );
});
