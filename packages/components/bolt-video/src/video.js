import { polyfillLoader } from '@bolt/core';

polyfillLoader.then((res) => {
  import(/* webpackChunkName: 'bolt-video' */ './video.standalone.js');
});
