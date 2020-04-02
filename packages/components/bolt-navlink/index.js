import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['bolt-navlink'], async () => {
  await import(/* webpackChunkName: "bolt-navlink" */ './navlink');
});
