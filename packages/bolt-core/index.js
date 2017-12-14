
// import environment from './utils/environment';
// import * as getMeta from './utils/get-meta';
// import mixins from './utils/mixins';
// // import sizes from './utils/sizes';
// import style from './utils/style';
// import * as css from './utils/css';
// import * as styledMixin from './utils/styled-mixin';

// export const utils = {
//   environment,
//   getMeta,
//   mixins,
//   css,
//   style,
//   styledMixin
// }

export { h, render } from 'preact';
export { define, props, withComponent } from 'skatejs';

// export * from './utils/events';
// export * from './utils/component';
export { withPreact } from './utils/renderer-preact';
export * from './utils/css';

export * from './data/spacing-sizes';
export * from './data/image-sizes';

export * from './polyfills/polyfill-loader';
