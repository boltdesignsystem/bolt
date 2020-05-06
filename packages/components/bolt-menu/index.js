import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bolt-menu'], async () => {
  await import(/*  webpackChunkName: 'bolt-menu' */ './main');
});
