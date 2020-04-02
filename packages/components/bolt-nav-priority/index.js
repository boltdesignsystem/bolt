import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['bolt-nav-priority'], async () => {
  await import(/* webpackChunkName: "bolt-nav-priority" */ './nav-priority');
});
