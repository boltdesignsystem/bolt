import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bolt-navbar'], async () => {
  await import(/* webpackChunkName: 'bolt-navbar' */ './main');
});
