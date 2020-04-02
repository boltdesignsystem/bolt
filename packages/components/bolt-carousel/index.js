import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['bolt-carousel'], async () => {
  await import(/* webpackChunkName: "bolt-carousel" */ './main');
});
