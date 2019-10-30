/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

/*
 * Polyfills loaded: HTML Imports, Custom Elements, platform polyfills, template
 * Used in: IE 11
 */

import 'regenerator-runtime/runtime';

if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

// Note: in the future, updating our Babel config might eliminate the need to manually include these
import 'core-js/modules/es.array.find';
import 'core-js/modules/es.string.includes';
import 'core-js/modules/es.array.for-each';

import './platform/es6-misc';
import './platform/custom-event';
import '@webcomponents/template/template.js';
import './platform/promise';
import './platform/symbol';
import './platform/flag-parser';
import 'element-closest';
// import '@webcomponents/shadydom/src/shadydom.js';

// import '@webcomponents/custom-elements/src/custom-elements.js';
import installCE from 'document-register-element/pony';

// by default, the second argument is 'auto'
// but it could be also 'force'
// which ignores feature detection and force
// the polyfill version of CustomElements
installCE(global, 'force');

// import '@webcomponents/shadycss/entrypoints/scoping-shim.js';
import '@webcomponents/url/url.js';
import './platform/baseuri';
import './platform/unresolved';
