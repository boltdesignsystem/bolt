import { polyfillLoader } from '../polyfills';

polyfillLoader.then(res => {
  if (!window.customElements.get('replace-with-children')) {
    import(/* 
      webpackMode: 'eager', 
      webpackChunkName: 'replace-with-children' 
    */ '@bolt/core/elements/replace-with-children');
  }
});
