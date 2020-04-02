import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['bolt-modal'], async () => {
  await import(/* webpackChunkName: "bolt-modal" */ './src/modal');
});
