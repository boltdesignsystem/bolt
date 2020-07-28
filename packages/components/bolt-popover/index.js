import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bolt-popover'], async () => {
  await import(/* webpackChunkName: 'bolt-popover' */ './src/popover');
});
