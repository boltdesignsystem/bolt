import { polyfillLoader } from '@bolt/core/polyfills';
import meta from './animate.meta';

if ('noModule' in document.createElement('script')) {
  polyfillLoader.then(res => {
    import(
      /* webpackChunkName: 'bolt-animate' */
      /* webpackMode: 'lazy' */
      /* webpackPreload: true */
      './src/animate'
    );
  });
}

export default {
  meta,
};
