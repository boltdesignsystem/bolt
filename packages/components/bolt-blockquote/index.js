import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bolt-blockquote'], async () => {
  await Promise.all([
    import(/* webpackChunkName: 'bolt-blockquote' */ './src/blockquote'),
  ]);
});
