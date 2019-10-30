import { polyfillLoader } from '@bolt/core/polyfills';

polyfillLoader.then(res => {
  import(/* webpackChunkName: 'bolt-video' */ './src/video.standalone.js');
});
