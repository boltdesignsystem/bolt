import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['bolt-video'], async () => {
  await Promise.all([
    import(/* webpackChunkName: 'bolt-video' */ './src/video.standalone.js'),
    import(/* webpackChunkName: 'bolt-video-meta' */ './src/video-meta.js'),
    import('@bolt/components-ratio/src/ratio'),
  ]);
});
