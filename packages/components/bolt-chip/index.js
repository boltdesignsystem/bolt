import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bolt-chip'], async () => {
  await Promise.all([import(/* webpackChunkName: 'bolt-chip' */ './src/chip')]);
});
