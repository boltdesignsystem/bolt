import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['bolt-table'], async () => {
  await import(/* webpackChunkName: "bolt-table" */ './src/table');
});
