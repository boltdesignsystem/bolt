import { polyfillLoader } from '@bolt/core';

polyfillLoader.then((res) => {
  import(/* webpackMode: 'lazy', webpackChunkName: 'bolt-copy-to-clipboard' */ './copy-to-clipboard.standalone.js');
});