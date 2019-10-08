import { polyfillLoader } from '@bolt/core/polyfills';

polyfillLoader.then(res => {
  import(
    /* webpackChunkName: 'bolt-video' */
    /* webpackMode: 'eager' */
    './src/video.standalone.js'
  );
  import(
    /* webpackChunkName: 'bolt-video-meta' */
    /* webpackMode: 'eager' */
    './src/video-meta.js'
  );
});
