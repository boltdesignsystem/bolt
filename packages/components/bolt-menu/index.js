import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['bolt-menu'], async () => {
  await Promise.all([import(/* webpackChunkName: "bolt-menu" */ './src/menu')]);
});
