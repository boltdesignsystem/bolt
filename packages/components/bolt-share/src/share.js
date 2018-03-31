import { polyfillLoader } from '@bolt/core';

polyfillLoader.then((res) => {
  import(/* webpackMode: 'lazy', webpackChunkName: 'bolt-share' */ './share.standalone.js');
});
