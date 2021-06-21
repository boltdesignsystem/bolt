import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bolt-carousel'], async () => {
  await import(/* webpackChunkName: 'bolt-carousel' */ './src/carousel');
});
