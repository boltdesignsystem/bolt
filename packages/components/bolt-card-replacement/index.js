import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bolt-card-replacement'], async () => {
  await import(/* webpackChunkName: 'bolt-card-replacement' */ './main');
});
