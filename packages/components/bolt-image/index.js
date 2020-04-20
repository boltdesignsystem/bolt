import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bolt-image'], async () => {
  await Promise.all([
    import(/* webpackChunkName: 'bolt-image' */ './src/image'),
  ]);
});
