import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['form'], async () => {
  await import('./src/form.js');
});
