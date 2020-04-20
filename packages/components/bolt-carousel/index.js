import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bolt-carousel'], async () => {
  await Promise.all([
    import(/* webpackChunkName: 'bolt-carousel' */ './src/carousel'),
  ]);
});
