import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bolt-banner'], async () => {
  await Promise.all([
    import(/* webpackChunkName: 'bolt-banner' */ './src/banner'),
  ]);
});
