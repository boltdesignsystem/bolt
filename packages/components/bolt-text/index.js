import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['bolt-text'], async () => {
  await import(/* webpackChunkName: "bolt-text" */ './src/text');
});
