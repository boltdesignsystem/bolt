import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['bolt-sticky'], async () => {
  await import(/* webpackChunkName: "bolt-sticky" */ './src/sticky.js');
});
