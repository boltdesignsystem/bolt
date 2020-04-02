import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['bolt-block-list'], async () => {
  await import('./block-list.standalone.js');
});
