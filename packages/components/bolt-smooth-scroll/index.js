import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['a'], async () => {
  await import(
    /* webpackChunkName: "bolt-smooth-scroll" */ './src/smooth-scroll'
  );
});
