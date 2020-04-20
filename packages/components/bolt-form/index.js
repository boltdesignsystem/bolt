import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['form'], async () => {
  await import(/* webpackChunkName: "bolt-form" */ './src/form.js');
});
