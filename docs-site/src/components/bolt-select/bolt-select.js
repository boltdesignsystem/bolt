import { polyfillLoader } from '@bolt/core/polyfills';

polyfillLoader.then(res => {
  import(
    /* 
    webpackMode: 'eager', 
    webpackChunkName: 'bolt-select' 
  */ './bolt-select.standalone'
  );
});
