
WebComponents.waitFor(() => {
  return import(
    /* webpackChunkName: "bolt-button" */
    /* webpackPreload: true */
    './button.standalone.js',
  );
});