import { polyfillLoader } from '@bolt/core/polyfills';

polyfillLoader.then(res => {
  import(/* 
    webpackMode: 'lazy', 
    webpackChunkName: 'bolt-lit-test' 
  */ './bolt-lit-test');
});
