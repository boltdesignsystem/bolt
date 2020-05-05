import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bolt-image'], async () => {
  await import(/* webpackChunkName: 'bolt-image' */ './src/image');
});
