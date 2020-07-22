import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bolt-link'], async () => {
  await import(/* webpackChunkName: 'bolt-link' */ './src/link');
});
