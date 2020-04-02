import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['bolt-nav-priority'], async () => {
  await import('./nav-priority');
});
