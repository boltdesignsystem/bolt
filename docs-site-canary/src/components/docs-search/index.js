import { polyfillLoader } from '@bolt/core/polyfills';

polyfillLoader.then(res => {
  import(
    /* 
    webpackMode: 'eager', 
    webpackChunkName: 'bolt-docs-search' 
  */ './docs-search.js'
  );
});
