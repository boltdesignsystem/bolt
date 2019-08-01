import { polyfillLoader } from '@bolt/core/polyfills/index';

polyfillLoader.then(() => {
  import(
    /* webpackMode: 'eager', webpackChunkName: 'bolt-ratio' */ './src/ratio.js'
  ).then(Component => {
    customElements.define(`${bolt.namespace}-ratio`, Component.BoltRatio());
  });
});
