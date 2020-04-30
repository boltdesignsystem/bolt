import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bolt-ol'], async () => {
  if (!window.customElements.get('bolt-li')) {
    await Promise.all([
      import(/* webpackChunkName: 'bolt-ol' */ './src/ol'),
      import(/* webpackChunkName: 'bolt-li' */ '@bolt/components-li/src/li.js'),
    ]);
  } else {
    await import(/* webpackChunkName: 'bolt-ol' */ './src/ol');
  }
});
