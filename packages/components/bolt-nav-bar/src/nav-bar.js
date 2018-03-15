import { polyfillLoader } from '@bolt/core';

polyfillLoader.then((res) => {
  import(/* webpackChunkName: 'bolt-navbar' */ './nav-bar.standalone.js');
});