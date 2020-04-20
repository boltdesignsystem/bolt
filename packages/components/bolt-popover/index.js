import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bolt-popover'], async () => {
  await Promise.all([
    import(/* webpackChunkName: 'bolt-popover' */ './src/popover'),
  ]);
});
