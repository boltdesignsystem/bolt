import(/*

  webpackChunkName: 'bolt-dropdown'
*/ './dropdown.js').then(
  BoltDropdown => {
    if (!customElements.get('bolt-dropdown')) {
      customElements.define(
        BoltDropdown.BoltDropdown.is,
        BoltDropdown.BoltDropdown,
      );
    }
  },
);
