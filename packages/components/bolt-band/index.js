import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bolt-band'], async () => {
  await Promise.all([
    import(
      /* webpackChunkName: 'bolt-band' */ './src/band'
    ),
  ]);
});
