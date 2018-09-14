import { polyfillLoader } from '@bolt/core/polyfills';

polyfillLoader.then(res => {
  if (!window.customElements.get('bolt-table')) {
    import(/* 
      webpackMode: 'eager', 
      webpackChunkName: 'bolt-table' 
    */ './src/table.standalone.js');
  }
});
