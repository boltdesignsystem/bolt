import { polyfillLoader } from '@bolt/core/polyfills';

polyfillLoader.then(res => {
  import(/* 
    webpackMode: 'lazy', 
    webpackChunkName: 'bolt-preact-test' 
  */ './bolt-preact-test.tsx');
});
