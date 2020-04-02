import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['bolt-select'], async () => {
  await import('./bolt-select.standalone');
});
