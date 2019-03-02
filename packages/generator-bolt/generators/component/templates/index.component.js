import { polyfillLoader } from '@bolt/core/polyfills';

polyfillLoader.then(res => {
  import(/* webpackMode: 'eager', webpackChunkName: 'bolt-<%= props.names.kebabcase.default %>' */ './src/<%= props.names.kebabcase.default %>');
});
