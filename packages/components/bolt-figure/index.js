import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['bolt-figure'], async () => {
  import(/* webpackChunkName: "bolt-figure" */ './src/figure');
});
