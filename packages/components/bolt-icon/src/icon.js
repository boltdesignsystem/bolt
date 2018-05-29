
WebComponents.waitFor(() => {
  return import(
    /* webpackChunkName: "bolt-icon" */
    /* webpackPreload: true */
    './icon.standalone.js',
  );
});