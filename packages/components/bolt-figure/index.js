import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bolt-figure'], async () => {
  await Promise.all([
    import(/* webpackChunkName: 'bolt-figure' */ './src/figure'),
  ]);
});
