import { polyfillLoader } from '@bolt/core-v3.x/polyfills';

polyfillLoader.then(res => {
  import(/* webpackMode: 'eager', webpackChunkName: 'bolt-ul' */ './src/ul');
  if (!window.customElements.get('bolt-li')) {
    import(
      /* 
      webpackMode: 'eager', 
      webpackChunkName: 'bolt-li' 
    */ '@bolt/components-li/src/li.js'
    );
  }
});
