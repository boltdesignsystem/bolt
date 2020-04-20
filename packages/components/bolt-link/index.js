import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bolt-link'], async () => {
  await Promise.all([import(/* webpackChunkName: 'bolt-link' */ './src/link')]);
});
