import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bolt-modal'], async () => {
  await import(/* webpackChunkName: 'bolt-modal' */ './src/modal');
});
