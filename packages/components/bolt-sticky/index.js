import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bolt-sticky'], async () => {
  await import(/* webpackChunkName: "bolt-sticky" */ './src/sticky.js');
});
