import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bolt-video'], async () => {
  await Promise.all([
    import(/* webpackChunkName: 'bolt-video' */ './src/video.standalone.js'),
    import(/* webpackChunkName: 'bolt-video-meta' */ './src/video-meta.js'),

    // @todo: possibly re-enable once all components converted over to use lazyQueue
    // import(
    //   /* webpackChunkName: "bolt-ratio" */ '@bolt/components-ratio/src/ratio'
    // ),
  ]);
});
