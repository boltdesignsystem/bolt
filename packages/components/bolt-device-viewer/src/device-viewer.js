import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bolt-device-viewer'], async () => {
  await Promise.all([
    import(
      /* webpackChunkName: 'bolt-device-viewer' */ './device-viewer.standalone.js'
    ),
  ]);
});
