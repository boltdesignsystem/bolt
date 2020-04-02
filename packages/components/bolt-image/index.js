import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['bolt-image'], async () => {
  await Promise.all([import('./src/image'), import('@bolt/components-ratio')]);
});
