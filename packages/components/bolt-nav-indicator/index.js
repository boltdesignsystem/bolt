import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['bolt-nav-indicator'], async () => {
  await import(/* webpackChunkName: "bolt-nav-indicator" */ './nav-indicator');
});
