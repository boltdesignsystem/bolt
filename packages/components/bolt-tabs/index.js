import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['bolt-tabs', 'bolt-tab-panel'], async () => {
  await Promise.all([import(/* webpackChunkName: "bolt-tabs" */ './src')]);
});
