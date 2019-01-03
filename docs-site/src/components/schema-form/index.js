import { polyfillLoader } from '@bolt/core/polyfills';

polyfillLoader.then(res => {
  import(/* 
    webpackMode: 'lazy', 
    webpackChunkName: 'bolt-component-explorer' 
  */ './component-explorer.js');
});

