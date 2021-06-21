import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bolt-ratio'], async () => {
  await import(/* webpackChunkName: 'bolt-ratio' */ './src/ratio');
});
