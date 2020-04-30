import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bolt-text'], async () => {
  await import(/*  webpackChunkName: 'bolt-text' */ './src/text');
});
