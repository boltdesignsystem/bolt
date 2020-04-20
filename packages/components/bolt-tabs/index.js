import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bolt-tabs'], async () => {
  await Promise.all([
    import(/* webpackChunkName: 'bolt-tabs' */ './src/tabs'),
    import(/* webpackChunkName: 'bolt-tab-panel' */ './src/TabPanel'),
  ]);
});
