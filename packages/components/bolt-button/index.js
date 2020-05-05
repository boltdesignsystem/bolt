import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bolt-button'], async () => {
  await import(/* webpackChunkName: 'bolt-button' */ './src/button');
});
