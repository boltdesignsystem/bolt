import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['bolt-chip'], async () => {
  await import(/* webpackChunkName: "bolt-chip" */ './src/chip');
});
