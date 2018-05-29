
WebComponents.waitFor(() => {
  return import(/* webpackMode: 'eager', webpackChunkName: 'bolt-placeholder' */ './placeholder.standalone.js');
});