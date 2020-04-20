import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bolt-list'], async () => {
  await Promise.all([
    import(/* webpackChunkName: 'bolt-list' */ './src/list'),
    import(/* webpackChunkName: 'bolt-list-item' */ './src/_list-item'),
  ]);
});
