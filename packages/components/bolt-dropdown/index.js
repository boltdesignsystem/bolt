import { polyfillLoader } from '@bolt/core-v3.x/polyfills';

polyfillLoader.then(res => {
  import(
    /*
    webpackMode: 'eager',
    webpackChunkName: 'bolt-dropdown'
  */ './dropdown.js'
  ).then(BoltDropdown => {
    if (!customElements.get('bolt-dropdown')) {
      customElements.define(
        BoltDropdown.BoltDropdown.is,
        BoltDropdown.BoltDropdown,
      );
    }
  });
});
