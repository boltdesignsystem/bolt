import { polyfillLoader } from '@bolt/core';

polyfillLoader.then(() => {
  import(/* webpackChunkName: 'pw-ratio' */ '@bolt/global/styles/05-objects/objects-ratio/ratio.standalone.js')
    .then((Component) => {
      customElements.define(`${bolt.namespace}-ratio`, Component.BoltRatio());
    });
});
