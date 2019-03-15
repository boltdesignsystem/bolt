import { polyfillLoader } from '@bolt/core/polyfills';

polyfillLoader.then(res => {
  import(/* webpackChunkName: 'bolt-video' */ './src/video.js');
  import(/* webpackChunkName: 'bolt-video-meta' */ './src/Meta/VideoMeta.js');
});
