import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['bolt-copy-to-clipboard'], async () => {
  await import('./copy-to-clipboard.standalone.js');
});
