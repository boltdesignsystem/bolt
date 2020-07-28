import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['a'], async () => {
  await import(
    /* webpackChunkName: "bolt-smooth-scroll" */ './src/smooth-scroll'
  );
});
