import { polyfillLoader } from '@bolt/core';

polyfillLoader.then(() => {
  import(/* webpackMode: 'eager', webpackChunkName: 'bolt-ratio' */ './ratio.standalone.js')
    .then((Component) => {
      customElements.define(`${bolt.namespace}-ratio`, Component.BoltRatio());
    });
});
