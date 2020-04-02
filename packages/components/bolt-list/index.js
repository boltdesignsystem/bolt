import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['bolt-list'], async () => {
  await Promise.all([import('./src/list.js'), import('./src/_list-item')]);
});
