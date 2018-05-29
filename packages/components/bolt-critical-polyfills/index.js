/* eslint-disable */
import { polyfillLoader } from '@bolt/core/polyfills';

(function () {
  polyfillLoader.then((res) => {
    console.log('polyfills loaded!');
  });
})();
