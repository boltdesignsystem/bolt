import { polyfillLoader } from '@bolt/core/polyfills';

polyfillLoader.then(res => {
  import(/* webpackChunkName: 'bolt-video' */ './video.standalone.js');
});
