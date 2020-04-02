import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['bolt-banner'], async () => {
  import(/* webpackChunkName: "bolt-banner" */ './src/banner');
});
