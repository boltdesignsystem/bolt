import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['bolt-modal'], async () => {
  await import('./src/modal');
});
