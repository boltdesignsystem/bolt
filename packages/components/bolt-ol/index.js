import { polyfillLoader } from '@bolt/core/polyfills';

polyfillLoader.then(res => {
  import(
    /* webpackMode: 'eager', webpackChunkName: 'bolt-unordered-list' */ './src/ol'
  );

  if (!window.customElements.get('bolt-li')) {
    import(
      /* 
      webpackMode: 'eager', 
      webpackChunkName: 'bolt-li' 
    */ '@bolt/components-li/src/li.js'
    );
  }
  // import(/* webpackMode: 'eager', webpackChunkName: 'bolt-unordered-list-item' */ './src/_ordered-list-item');
});
