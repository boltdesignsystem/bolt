import { polyfillLoader } from '@bolt/core';

polyfillLoader.then(() => {
  import(/* webpackChunkName: 'bolt-code' */ './code.js')
    .then((Component) => {
      customElements.define(`${bolt.namespace}-code`, Component.BoltCode());
    });
});
