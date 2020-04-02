import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['bolt-device-viewer'], async () => {
  await import(
    /* webpackChunkName: "bolt-device-viewer" */ './device-viewer.standalone.js'
  );
});
