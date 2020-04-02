import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['bolt-code-snippet'], async () => {
  await import('./code-snippet.standalone.js');
});
