import { polyfillLoader } from '@bolt/core/polyfills';

polyfillLoader.then(res => {
  import(
    /* 
    webpackMode: 'lazy', 
    webpackChunkName: 'editor-integration' 
  */ './editor-integration'
  );
});
