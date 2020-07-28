import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bolt-banner'], async () => {
  await import(/* webpackChunkName: 'bolt-banner' */ './src/banner');
});
