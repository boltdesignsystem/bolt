import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bolt-nav-priority'], async () => {
  await import(/* webpackChunkName: 'bolt-priority' */ './nav-priority.js');
});
