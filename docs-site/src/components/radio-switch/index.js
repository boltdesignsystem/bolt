import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bolt-radio-switch'], async () => {
  await Promise.all([
    import(
      /*
      webpackChunkName: 'bolt-radio-switch'
    */ './radio-switch.js'
    ),
    import(
      /*
      webpackChunkName: 'bolt-change-case'
    */ './change-case.js'
    ),
  ]);
});
