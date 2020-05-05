import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bolt-li'], async () => {
  if (!window.customElements.get('bolt-li')) {
    await import(
      /* webpackChunkName: 'bolt-li' */ '@bolt/components-li/src/li.js'
    );
  }
});
