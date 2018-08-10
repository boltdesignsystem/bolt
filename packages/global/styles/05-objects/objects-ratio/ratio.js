import { polyfillLoader } from '@bolt/core/polyfills';

polyfillLoader.then(() => {
  import(/* webpackMode: 'eager', webpackChunkName: 'bolt-ratio' */ './ratio.standalone.js').then(
    Component => {
      customElements.define(`${bolt.namespace}-ratio`, Component.BoltRatio());
    },
  );
});
