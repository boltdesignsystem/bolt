"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var removeNewLineRegex = /(\r\n|\n|\r)/gm;
/**
 * Minify the JSON
 * @param jsonStr
 * @return {any | string | void}
 */
function minifyJSON(jsonStr) {
    return jsonStr && jsonStr.trim().replace(removeNewLineRegex, '');
}
exports.minifyJSON = minifyJSON;
