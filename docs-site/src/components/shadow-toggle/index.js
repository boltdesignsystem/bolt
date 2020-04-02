import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['bolt-shadow-toggle'], async () => {
  await import('./shadow-toggle.js');
});
