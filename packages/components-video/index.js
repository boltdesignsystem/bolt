import { polyfillLoader } from '@bolt/core-v3.x/polyfills';

polyfillLoader.then(res => {
  import(/* webpackChunkName: 'bolt-video' */ './src/video.standalone.js');
  import(/* webpackChunkName: 'bolt-video-meta' */ './src/video-meta.js');
});
