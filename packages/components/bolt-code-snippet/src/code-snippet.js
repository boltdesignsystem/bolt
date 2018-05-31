import { polyfillLoader } from '@bolt/core';

polyfillLoader.then(() => {
  import(/* webpackChunkName: 'bolt-code-snippet' */ './code-snippet.standalone.js');
});
