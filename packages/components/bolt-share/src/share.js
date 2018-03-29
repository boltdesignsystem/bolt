import { polyfillLoader } from '@bolt/core';

polyfillLoader.then((res) => {
  import(/* webpackMode: 'lazy', webpackChunkName: 'bolt-copy-to-clipboard' */ './share.standalone.js');
});
