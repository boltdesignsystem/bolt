// Via https://github.com/webcomponents/webcomponents-platform/blob/master/webcomponents-platform.js

/**
 * @license
 * Copyright(c) 2016 The Polymer Project Authors.All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 * */

  (function (scope) {
    // defaultPrevented is broken in IE.
    // https://connect.microsoft.com/IE/feedback/details/790389/event-defaultprevented-returns-false-after-preventdefault-was-called
    const workingDefaultPrevented = (function () {
      const e = document.createEvent('Event');
      e.initEvent('foo', true, true);
      e.preventDefault();
      return e.defaultPrevented;
    }());

    if (!workingDefaultPrevented) {
      const origPreventDefault = Event.prototype.preventDefault;
      Event.prototype.preventDefault = function () {
        if (!this.cancelable) {
          return;
        }

        origPreventDefault.call(this);

        Object.defineProperty(this, 'defaultPrevented', {
          get() {
            return true;
          },
          configurable: true,
        });
      };
    }

    const isIE = /Trident/.test(navigator.userAgent);

    // CustomEvent constructor shim
    if (!window.CustomEvent || isIE && (typeof window.CustomEvent !== 'function')) {
      window.CustomEvent = function (inType, params) {
        params = params || {};
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(inType, Boolean(params.bubbles), Boolean(params.cancelable), params.detail);
        return e;
      };
      window.CustomEvent.prototype = window.Event.prototype;
    }

    // Event constructor shim
    if (!window.Event || isIE && (typeof window.Event !== 'function')) {
      const origEvent = window.Event;
      window.Event = function (inType, params) {
        params = params || {};
        const e = document.createEvent('Event');
        e.initEvent(inType, Boolean(params.bubbles), Boolean(params.cancelable));
        return e;
      };
      if (origEvent) {
        for (var i in origEvent) {
          window.Event[i] = origEvent[i];
        }
      }
      window.Event.prototype = origEvent.prototype;
    }

    if (!window.MouseEvent || isIE && (typeof window.MouseEvent !== 'function')) {
      const origMouseEvent = window.MouseEvent;
      window.MouseEvent = function (inType, params) {
        params = params || {};
        const e = document.createEvent('MouseEvent');
        e.initMouseEvent(inType,
          Boolean(params.bubbles), Boolean(params.cancelable),
          params.view || window, params.detail,
          params.screenX, params.screenY, params.clientX, params.clientY,
          params.ctrlKey, params.altKey, params.shiftKey, params.metaKey,
          params.button, params.relatedTarget);
        return e;
      };
      if (origMouseEvent) {
        for (var i in origMouseEvent) {
          window.MouseEvent[i] = origMouseEvent[i];
        }
      }
      window.MouseEvent.prototype = origMouseEvent.prototype;
    }

    // ES6 stuff
    if (!Array.from) {
      Array.from = function (object) {
        return [].slice.call(object);
      };
    }

    if (!Object.assign) {
      const assign = function (target, source) {
        const n$ = Object.getOwnPropertyNames(source);
        for (var i = 0, p; i < n$.length; i++) {
          p = n$[i];
          target[p] = source[p];
        }
      };

      Object.assign = function (target, sources) {
        const args = [].slice.call(arguments, 1);
        for (var i = 0, s; i < args.length; i++) {
          s = args[i];
          if (s) {
            assign(target, s);
          }
        }
        return target;
      };
    }
  }(window.WebComponents));
