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
import 'core-js/modules/es.array.find';

import './platform/es6-misc';
import './platform/custom-event';
import '@webcomponents/template/template.js';
import './platform/promise';
// import 'es6-promise/auto';
import './platform/symbol';
import './platform/flag-parser';
// import '@webcomponents/shadydom/src/shadydom.js';

import '@webcomponents/custom-elements/src/custom-elements.js';

// import '@webcomponents/shadycss/entrypoints/scoping-shim.js';
import '@webcomponents/url/url.js';
import './platform/baseuri';
import './platform/unresolved';

// import 'es6-promise/auto';
import 'element-closest';
import 'whatwg-fetch';
import 'mdn-polyfills/Node.prototype.prepend';
import 'mdn-polyfills/Node.prototype.replaceWith'; // used in dropdown
import 'core-js/modules/es.array.iterator';
import 'core-js/modules/es.array.from';
import 'core-js/modules/es.string.starts-with';
import 'core-js/modules/es.array.includes';
import 'core-js/modules/es.array.for-each';
import 'core-js/modules/es.object.assign';
import 'core-js/modules/es.string.includes';
import 'core-js/modules/es.string.repeat';
// import 'custom-event-polyfill'; // something in bolt-animate or recent animations work requires this to work in IE 11
// import 'core-js/modules/es.array.find';
// @todo: find-index polyfill is temporarily disabled until we can fix bug in table.js
// import 'core-js/modules/es.array.find-index';
// import './symbol-polyfill';
// import './remove-polyfill';
// import '@webcomponents/template/template.js';
import WeakSet from '@ungap/weakset';
window.WeakSet = WeakSet;

import smoothscroll from 'smoothscroll-polyfill';

// kick off the polyfill!
smoothscroll.polyfill();
