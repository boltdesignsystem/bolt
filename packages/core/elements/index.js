import { polyfillLoader } from '../polyfills';

polyfillLoader.then(res => {
  import(
    /*
    webpackMode: 'eager',
    webpackChunkName: 'elements'
  */ './elements'
  );
});
