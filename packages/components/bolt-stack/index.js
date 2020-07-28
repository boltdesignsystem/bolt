import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bolt-stack'], async () => {
  await import(/* webpackChunkName: 'bolt-stack' */ './src/stack');
});
