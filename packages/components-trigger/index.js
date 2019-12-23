import { polyfillLoader } from '@bolt/core-v3.x/polyfills';

polyfillLoader.then(res => {
  if (!window.customElements.get('bolt-trigger')) {
    import(
      /*
      webpackMode: 'eager',
      webpackChunkName: 'bolt-trigger'
    */ './src/trigger'
    );
  }
});
