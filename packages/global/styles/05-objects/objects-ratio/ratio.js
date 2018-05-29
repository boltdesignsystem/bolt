WebComponents.waitFor(() => {
  return import(/* webpackMode: 'eager', webpackChunkName: 'bolt-ratio' */ './ratio.standalone.js');
});