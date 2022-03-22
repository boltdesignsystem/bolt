const floatingActionButtons = document.querySelectorAll(
  '.c-bolt-floating-action-buttons',
);

if (floatingActionButtons.length) {
  import(
    /* webpackChunkName: 'bolt-floating-action-buttons' */ './src/floating-action-buttons'
  ).then(({ BoltFloatingActionButtons }) => {
    floatingActionButtons.forEach(el => {
      const floatingActionButtonsComponent = new BoltFloatingActionButtons(el);
    });
  });
}
