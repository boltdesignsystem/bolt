import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bolt-li'], async () => {
  if (!window.customElements.get('bolt-li')) {
    await Promise.all([
      import(/* webpackChunkName: 'bolt-li' */ '@bolt/components-li/src/li.js'),
    ]);
  }
});
