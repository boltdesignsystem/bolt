import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bolt-icon'], async () => {
  await Promise.all([
    import(/* webpackChunkName: 'bolt-icon' */ './icon.standalone.js'),
  ]);
});
