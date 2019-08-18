import { polyfillLoader } from '@bolt/core/polyfills';

// Eager so the <replace-with-children> component runs when this component is also booting up, resulting in no initial flash of unstyled content
polyfillLoader.then(res => {
  import(
    /* webpackMode: 'eager', webpackChunkName: 'bolt-placeholder' */ './placeholder.standalone.js'
  );
  import(
    /* webpackMode: 'eager', webpackChunkName: 'replace-with-children' */ '@bolt/core/elements/replace-with-children'
  );
});
