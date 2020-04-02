import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['bolt-animate'], async () => {
  await import(/* webpackChunkName: "bolt-animate" */ './src/animate');
});
