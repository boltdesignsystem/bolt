import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['bolt-text'], async () => {
  await import('./src/text');
});
