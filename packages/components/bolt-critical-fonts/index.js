// import { polyfillLoader } from '@bolt/core';

if (!bolt.config.prod) {
  import(/* webpackMode: 'lazy', webpackChunkName: 'bolt-font-loader' */ './src/critical-fonts.js');
} else {
  import(/* webpackMode: 'eager', webpackChunkName: 'bolt-font-loader' */ './src/critical-fonts.js');
}
