import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bolt-table'], async () => {
  await import(/* webpackChunkName: 'bolt-table' */ './src/table');
});
