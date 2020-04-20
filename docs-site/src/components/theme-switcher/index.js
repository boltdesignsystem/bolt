import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bolt-theme-switcher'], async () => {
  await Promise.all([
    import(
      /*
      webpackChunkName: 'bolt-theme-switcher'
    */ './theme-switcher'
    ),
  ]);
});
