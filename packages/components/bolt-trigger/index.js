import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['bolt-trigger'], async () => {
  await import('./src/trigger');
});
