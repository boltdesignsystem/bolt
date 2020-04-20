import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bolt-tooltip'], async () => {
  await Promise.all([
    import(/* webpackChunkName: 'bolt-tooltip' */ './src/tooltip'),
  ]);
});
