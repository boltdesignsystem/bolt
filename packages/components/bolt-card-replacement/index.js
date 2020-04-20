import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bolt-card-replacement'], async () => {
  await Promise.all([
    import(/* webpackChunkName: 'bolt-card-replacement' */ './main'),
  ]);
});
