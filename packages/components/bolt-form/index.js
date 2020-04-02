import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['form'], async () => {
  await import(/* webpackChunkName: "bolt-form" */ './src/form.js');
});
