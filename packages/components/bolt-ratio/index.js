import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bolt-ratio'], async () => {
  await Promise.all([
    import(/* webpackChunkName: 'bolt-ratio' */ './src/ratio'),
  ]);
});
