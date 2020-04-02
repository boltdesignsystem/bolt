import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['bolt-editor'], async () => {
  await import('./main');
});
