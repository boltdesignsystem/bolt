
import environment from './utils/environment';
import * as getMeta from './utils/get-meta';
import mixins from './utils/mixins';
// import sizes from './utils/sizes';
import style from './utils/style';
import * as css from './utils/css';
import * as styledMixin from './utils/styled-mixin';

export const utils = {
  environment,
  getMeta,
  mixins,
  css,
  style,
  styledMixin
}

export * from './utils/css';
export * from './utils/spacing-sizes';
export * from './utils/component';
export * from './polyfills/polyfill-loader';
