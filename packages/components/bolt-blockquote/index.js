import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bolt-blockquote'], async () => {
  await import(/* webpackChunkName: 'bolt-blockquote' */ './src/blockquote');
});
