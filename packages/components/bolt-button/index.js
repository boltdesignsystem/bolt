import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bolt-button'], async () => {
  await Promise.all([
    import(/* webpackChunkName: 'bolt-button' */ './src/button'),
  ]);
});
