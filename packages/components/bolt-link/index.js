import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['bolt-link'], async () => {
  await Promise.all([import(/* webpackChunkName: "bolt-link" */ './src/link')]);
});
