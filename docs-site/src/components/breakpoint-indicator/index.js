import '@bolt/polyfills';
import { hasNativeShadowDomSupport } from '@bolt/element';

// opt-out of rendering on older browsers since this is a nice-to-have vs must-have
if (hasNativeShadowDomSupport) {
  import(
    /*
    webpackMode: 'lazy',
    webpackChunkName: 'breakpoint-indicator'
  */ './breakpoint-indicator'
  );
}
