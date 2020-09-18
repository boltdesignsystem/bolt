import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bolt-page-header'], async () => {
  await import(/* webpackChunkName: 'bolt-page-header' */ './src/page-header');
});
