import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bolt-menu'], async () => {
  await Promise.all([
    import(/* webpackChunkName: 'bolt-menu' */ './src/menu'),
    import(/* webpackChunkName: 'bolt-menu-item' */ './src/_menu-item'),
  ]);
});
