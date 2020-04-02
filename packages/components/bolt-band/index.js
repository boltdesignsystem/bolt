import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['bolt-band'], async () => {
  await import('./src/band');
});
