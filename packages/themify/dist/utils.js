"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JSONFallbackCache;
var _hasNativeSupport;
/**
 *
 * @param {string} path
 */
function loadCSS(path, callback) {
    var head = document.getElementsByTagName('head')[0];
    var style = document.createElement('link');
    style.href = path;
    style.rel = 'stylesheet';
    style.onload = callback;
    head.appendChild(style);
}
exports.loadCSS = loadCSS;
/**
 *
 * @param {string} style
 */
function injectStyle(style) {
    /** Don't replace the style tag, otherwise you will remove the old changes */
    if (hasNativeCSSProperties()) {
        inject();
    }
    else {
        /** Use the same style tag as we replace all either way */
        var styleTag = document.getElementById('themify');
        if (!styleTag) {
            inject();
        }
        else {
            styleTag.innerHTML = style;
        }
    }
    function inject() {
        var node = document.createElement('style');
        node.id = 'themify';
        node.innerHTML = style;
        document.head.appendChild(node);
    }
}
exports.injectStyle = injectStyle;
/**
 *
 * .dark {
 *   --primary-100: 30, 24, 33;
 * }
 *
 * :root {
 *   --primary-100: 22, 21, 22;
 * }
 *
 * @param customTheme
 * @returns {string}
 */
function _generateNewVariables(customTheme) {
    // First, we need the variations [dark, light]
    var variations = Object.keys(customTheme);
    return variations.reduce(function (finalOutput, variation) {
        // Next, we need the variation keys [primary-100, accent-100]
        var variationKeys = Object.keys(customTheme[variation]);
        var variationOutput = variationKeys.reduce(function (acc, variable) {
            var value = normalizeColor(customTheme[variation][variable]);
            return (acc += "--" + variable + ": " + value + ";");
        }, '');
        return (finalOutput += (variation === 'light' ? ':root' : '.' + variation) + "{" + variationOutput + "}");
    }, '');
}
exports._generateNewVariables = _generateNewVariables;
/**
 *
 * @returns {boolean}
 */
function hasNativeCSSProperties() {
    if (_hasNativeSupport != null) {
        return _hasNativeSupport;
    }
    _hasNativeSupport = window.CSS && window.CSS.supports && window.CSS.supports('--fake-var', 0);
    return _hasNativeSupport;
}
exports.hasNativeCSSProperties = hasNativeCSSProperties;
/**
 * Load the CSS fallback file on load
 */
function loadCSSVariablesFallback(path, cb) {
    if (!hasNativeCSSProperties()) {
        loadCSS(path, cb);
    }
}
exports.loadCSSVariablesFallback = loadCSSVariablesFallback;
function loadJSON(url, cb) {
    var req = new XMLHttpRequest();
    req.overrideMimeType('application/json');
    req.open('GET', url, true);
    req.onload = function () {
        cb(JSON.parse(req.responseText));
    };
    req.send(null);
}
/**
 *
 * @param customTheme
 */
function replaceColors(fallbackJSONPath, customTheme, palette) {
    if (customTheme) {
        if (hasNativeCSSProperties()) {
            var newColors = _generateNewVariables(customTheme);
            injectStyle(newColors);
        }
        else {
            var replace = function (JSONFallback) {
                JSONFallbackCache = JSONFallback;
                _handleUnSupportedBrowsers(customTheme, palette, JSONFallbackCache);
            };
            if (JSONFallbackCache) {
                replace(JSONFallbackCache);
            }
            else {
                loadJSON(fallbackJSONPath, replace);
            }
        }
    }
}
exports.replaceColors = replaceColors;
/**
 *
 * @param customTheme
 */
function _handleUnSupportedBrowsers(customTheme, palette, JSONFallback) {
    var themifyRegExp = /%\[(.*?)\]%/gi;
    var merged = mergeDeep(palette, customTheme);
    var finalOutput = Object.keys(customTheme).reduce(function (acc, variation) {
        var value = JSONFallback[variation].replace(themifyRegExp, function (occurrence, value) {
            var _a = value.replace(/\s/g, '').split(','), variation = _a[0], variable = _a[1], opacity = _a[2];
            var color = merged[variation][variable];
            var normalized = hexToRGB(color, opacity);
            return normalized;
        });
        return (acc += value);
    }, '');
    injectStyle(finalOutput);
    return finalOutput;
}
exports._handleUnSupportedBrowsers = _handleUnSupportedBrowsers;
/**
 * Omit the rgb and braces from rgb
 * rgb(235, 246, 244) => 235, 246, 244
 * @param rgb
 * @returns {string}
 */
function normalizeRgb(rgb) {
    return rgb.replace('rgb(', '').replace(')', '');
}
/**
 *
 * @param color
 * @returns {*}
 */
function normalizeColor(color) {
    if (isHex(color)) {
        return normalizeRgb(hexToRGB(color));
    }
    if (isRgb(color)) {
        return normalizeRgb(color);
    }
    return color;
}
/**
 *
 * @param color
 * @returns {boolean}
 */
function isHex(color) {
    return color.indexOf('#') > -1;
}
/**
 *
 * @param color
 * @returns {boolean}
 */
function isRgb(color) {
    return color.indexOf('rgb') > -1;
}
/**
 *
 * @param hex
 * @param alpha
 * @returns {string}
 */
function hexToRGB(hex, alpha) {
    if (alpha === void 0) { alpha = false; }
    var c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split('');
        if (c.length == 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = '0x' + c.join('');
        if (alpha) {
            return "rgba(" + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ", " + alpha + ")";
        }
        return "rgb(" + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ")";
    }
    throw new Error('Bad Hex');
}
/**
 *
 * @param target
 * @param sources
 * @returns {*}
 */
function mergeDeep(target) {
    var sources = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
    }
    if (!sources.length)
        return target;
    var source = sources.shift();
    if (isObject(target) && isObject(source)) {
        for (var key in source) {
            if (isObject(source[key])) {
                if (!target[key])
                    Object.assign(target, (_a = {},
                        _a[key] = {},
                        _a));
                mergeDeep(target[key], source[key]);
            }
            else {
                Object.assign(target, (_b = {},
                    _b[key] = source[key],
                    _b));
            }
        }
    }
    return mergeDeep.apply(void 0, [target].concat(sources));
    var _a, _b;
}
/**
 *
 * @param item
 * @returns {*|boolean}
 */
function isObject(value) {
    return Object.prototype.toString.call(value) === '[object Object]';
}
module.exports = {
    replaceColors: replaceColors,
    loadCSSVariablesFallback: loadCSSVariablesFallback,
    _handleUnSupportedBrowsers: _handleUnSupportedBrowsers,
    _generateNewVariables: _generateNewVariables
};
