import { polyfillLoader } from '../polyfills';

polyfillLoader.then(res => {
  if (!window.customElements.get('replace-with-children')) {
    import(/* 
      webpackMode: 'eager', 
      webpackChunkName: 'replace-with-children' 
    */ '@bolt/core/elements/replace-with-children');
  }

  if (!window.customElements.get('replace-with-grandchildren')) {
    import(/*
      webpackMode: 'eager',
      webpackChunkName: 'replace-with-grandchildren'
    */ '@bolt/core/elements/replace-with-grandchildren');
  }

  if (!window.customElements.get('bolt-action')) {
    import(/*
      webpackMode: 'eager',
      webpackChunkName: 'bolt-action'
    */ '@bolt/core/elements/bolt-action');
  }
});
