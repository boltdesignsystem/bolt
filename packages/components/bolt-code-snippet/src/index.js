import { polyfillLoader } from '@bolt/core';

polyfillLoader.then(() => {
  import(/* webpackChunkName: 'bolt-code-snippet' */ './code-snippet.js')
    .then((Component) => {
      customElements.define(`${bolt.namespace}-code-snippet`, Component.BoltCodeSnippet());
    });
});
