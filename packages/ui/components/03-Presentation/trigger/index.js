import { polyfillLoader } from '@bolt/core/polyfills';

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
