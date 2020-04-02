import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['bolt-band'], async () => {
  await import(/* webpackChunkName: "bolt-band" */ './src/band');
});
