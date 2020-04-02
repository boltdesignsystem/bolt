import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['bolt-trigger'], async () => {
  await import(/* webpackChunkName: "bolt-trigger" */ './src/trigger');
});
