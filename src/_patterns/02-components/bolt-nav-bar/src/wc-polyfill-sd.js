// Template polyfill is necessary to use shadycss in IE11
// this comes before custom elements because of
// https://github.com/webcomponents/template/blob/master/template.js#L39
// require('@webcomponents/template');

// This comes after the native shim because it requries it to be patched first.
// require('@webcomponents/custom-elements/src/custom-elements.js');
  // Force the polyfill in Safari 10.0.0 and 10.0.1.
const { navigator } = window;
const { userAgent } = navigator;
const safari = userAgent.indexOf('Safari/60') !== -1;
const safariVersion = safari && userAgent.match(/Version\/([^\s]+)/)[1];
const safariVersions = [0, 1].map(v => `10.0.${v}`).concat(['10.0']);

if (safari && safariVersions.indexOf(safariVersion) > -1) {
window.ShadyDOM = { force: true };
}

// ShadyDOM comes first. Both because it may need to be forced and the
// ShadyCSS polyfill requires it to function.
import '@webcomponents/shadydom/src/shadydom.js';
import '@webcomponents/shadycss/scoping-shim.min';