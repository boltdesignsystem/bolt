import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bolt-tabs'], async () => {
  await import(/*  webpackChunkName: 'bolt-tabs' */ './main');
});
