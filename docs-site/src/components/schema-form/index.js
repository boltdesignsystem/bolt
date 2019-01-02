import { polyfillLoader } from '@bolt/core/polyfills';

polyfillLoader.then(res => {
  import(/* 
    webpackMode: 'eager', 
    webpackChunkName: 'bolt-component-explorer' 
  */ './component-explorer.js');
});
