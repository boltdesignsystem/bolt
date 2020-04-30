import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bolt-ul'], async () => {
  if (!window.customElements.get('bolt-li')) {
    await Promise.all([
      import(/* webpackChunkName: 'bolt-ul' */ './src/ul'),
      import(/* webpackChunkName: 'bolt-li' */ '@bolt/components-li/src/li.js'),
    ]);
  } else {
    await import(/* webpackChunkName: 'bolt-ul' */ './src/ul');
  }
});
