import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['bolt-card-replacement'], async () => {
  await Promise.all([import('./main.js')]);
});
