import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['bolt-icon'], async () => {
  await import('./icon.standalone.js');
});
