import { polyfillLoader } from '@bolt/core-v3.x/polyfills';

polyfillLoader.then(() => {
  import(
    /* webpackMode: 'eager', webpackChunkName: 'bolt-<%= props.name.kebabCase %>' */ './src/<%= props.name.kebabCase %>'
  );
});
