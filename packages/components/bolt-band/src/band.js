import { polyfillLoader } from '@bolt/core';

polyfillLoader.then((res) => {
  import(/* webpackMode: 'lazy', webpackChunkName: 'bolt-band' */ './band.standalone.js');
});