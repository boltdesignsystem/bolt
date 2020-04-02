import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['bolt-button'], async () => {
  await import('./src/button');
});
