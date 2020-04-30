import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bolt-list'], async () => {
  await import(/*  webpackChunkName: 'bolt-list' */ './main');
});
