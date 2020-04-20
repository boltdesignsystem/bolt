import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bolt-modal'], async () => {
  await Promise.all([
    import(/* webpackChunkName: 'bolt-modal' */ './src/modal'),
  ]);
});
