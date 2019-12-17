import { hasNativeShadowDomSupport } from '@bolt/element';
import { polyfillLoader } from '@bolt/core/polyfills';

// Don't try to run if Shadow DOM isn't supported
if (hasNativeShadowDomSupport) {
  polyfillLoader.then(res => {
    import(
      /*
      webpackMode: 'lazy',
      webpackChunkName: 'bolt-breakpoint-indicator'
    */ './breakpoint-indicator'
    );
  });
}
