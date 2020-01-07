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
import '@webcomponents/custom-elements/src/native-shim.js';
import 'core-js/modules/es.array.find';
import '@bolt/polyfills/platform/remove-polyfill.js';
import '@bolt/polyfills/platform/es6-misc';
import '@bolt/polyfills/platform/custom-event';
import '@webcomponents/template/template.js';
import '@bolt/polyfills/platform/promise';
import '@bolt/polyfills/platform/symbol';
import '@bolt/polyfills/platform/flag-parser';
import '@webcomponents/custom-elements/src/custom-elements.js';
import '@webcomponents/url/url.js';
import '@bolt/polyfills/platform/baseuri';
import '@bolt/polyfills/platform/unresolved';

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
import WeakSet from '@ungap/weakset';
window.WeakSet = WeakSet;

import smoothscroll from 'smoothscroll-polyfill';

// kick off the polyfill!
smoothscroll.polyfill();

/**
 * closest() polyfill
 * @link https://developer.mozilla.org/en-US/docs/Web/API/Element/closest#Polyfill
 */
if (window.Element && !Element.prototype.closest) {
  Element.prototype.closest = function(s) {
    var matches = (this.document || this.ownerDocument).querySelectorAll(s),
      i,
      el = this;
    do {
      i = matches.length;
      while (--i >= 0 && matches.item(i) !== el) {}
    } while (i < 0 && (el = el.parentElement));
    return el;
  };
}

if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}
