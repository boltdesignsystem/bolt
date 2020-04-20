import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bolt-stack'], async () => {
  await Promise.all([
    import(/* webpackChunkName: 'bolt-stack' */ './src/stack'),
  ]);
});
