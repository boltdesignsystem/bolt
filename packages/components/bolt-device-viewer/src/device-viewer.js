import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['bolt-device-viewer'], async () => {
  await import('./device-viewer.standalone.js');
});
