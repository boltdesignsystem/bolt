import { polyfillLoader } from '@bolt/core/polyfills';

polyfillLoader.then(res => {
  import(/* webpackMode: 'eager', webpackChunkName: 'bolt-<%= props.name.kebabCase %>' */ './src/<%= props.name.kebabCase %>');
});
