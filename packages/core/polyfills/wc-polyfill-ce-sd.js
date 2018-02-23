
// Template polyfill is necessary to use shadycss in IE11
// this comes before custom elements because of
// https://github.com/webcomponents/template/blob/master/template.js#L39


import '@webcomponents/shadydom/src/shadydom.js';
import 'document-register-element';

// ShadyCSS Shims (styling)
