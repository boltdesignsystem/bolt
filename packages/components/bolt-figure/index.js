import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bolt-figure'], async () => {
  await import(/* webpackChunkName: 'bolt-figure' */ './src/figure');
});
