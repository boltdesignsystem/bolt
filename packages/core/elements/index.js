import { polyfillLoader } from '../polyfills';

polyfillLoader.then(res => {
  if (!window.customElements.get('replace-with-children')) {
    import(/* 
      webpackMode: 'eager', 
      webpackChunkName: 'replace-with-children' 
    */ '@bolt/core/elements/replace-with-children');
  }

  if (!window.customElements.get('remove-html-tag')) {
    import(/*
      webpackMode: 'eager',
      webpackChunkName: 'remove-html-tag'
    */ '@bolt/core/elements/remove-html-tag');
  }
});
