import { polyfillLoader } from '@bolt/core/polyfills';

polyfillLoader.then(res => {
  import(/* 
    webpackMode: 'lazy', 
    webpackChunkName: 'lazy-lit-test' 
  */ './lazy-lit-test');
});
