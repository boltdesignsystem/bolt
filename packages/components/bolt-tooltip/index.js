import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bolt-tooltip'], async () => {
  await import(/* webpackChunkName: 'bolt-tooltip' */ './src/tooltip');
});
