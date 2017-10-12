/*! Built with http://stenciljs.com */
(function(appNamespace,publicPath){"use strict";
(function(publicPath){
    /** @stencil/router global **/

    var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    Context.activeRouter = (function () {
        var state = {};
        var nextListeners = [];
        function set(value) {
            state = __assign({}, state, value);
            dispatch();
        }
        function get(attrName) {
            if (!attrName) {
                return state;
            }
            return state[attrName];
        }
        function dispatch() {
            var listeners = nextListeners;
            for (var i = 0; i < listeners.length; i++) {
                var listener = listeners[i];
                listener();
            }
        }
        function subscribe(listener) {
            if (typeof listener !== 'function') {
                throw new Error('Expected listener to be a function.');
            }
            var isSubscribed = true;
            nextListeners.push(listener);
            return function unsubscribe() {
                if (!isSubscribed) {
                    return;
                }
                isSubscribed = false;
                var index = nextListeners.indexOf(listener);
                nextListeners.splice(index, 1);
            };
        }
        return {
            set: set,
            get: get,
            subscribe: subscribe
        };
    })();
})(publicPath);
})("App","/build/app/");