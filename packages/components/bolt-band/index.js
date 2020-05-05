import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bolt-band'], async () => {
  await import(/* webpackChunkName: 'bolt-band' */ './src/band');
});
