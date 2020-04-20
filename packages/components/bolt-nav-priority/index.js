import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bolt-nav-priority'], async () => {
  await Promise.all([
    import(/* webpackChunkName: 'bolt-priority' */ './nav-priority.js'),
  ]);
});
