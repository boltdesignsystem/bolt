import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['bolt-interactive-pathway'], async () => {
  await import(/* webpackChunkName: "bolt-micro-journeys" */ './src/index.js');
});
