import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bolt-interactive-pathway'], async () => {
  await import(/* webpackChunkName: "bolt-micro-journeys" */ './main');
});
