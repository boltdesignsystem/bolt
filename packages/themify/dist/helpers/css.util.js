"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _cleanCSS = require('clean-css');
var cleanCSS = new _cleanCSS({});
function minifyCSS(css) {
    return cleanCSS.minify(css).styles;
}
exports.minifyCSS = minifyCSS;
