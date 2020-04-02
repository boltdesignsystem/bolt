import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['bolt-interactive-pathway'], async () => {
  await import('./src/index.js');
});
