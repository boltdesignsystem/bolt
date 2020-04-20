import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bolt-shadow-toggle'], async () => {
  await import(
    /* webpackChunkName: "bolt-shadow-toggle" */ './shadow-toggle.js'
  );
});
