import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bolt-nav-indicator'], async () => {
  await import(
    /* webpackChunkName: 'bolt-nav-indicator' */ './nav-indicator.js'
  );
});
