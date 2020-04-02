import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['bolt-editor'], async () => {
  await import(/* webpackChunkName: "bolt-editor" */ './main');
});
