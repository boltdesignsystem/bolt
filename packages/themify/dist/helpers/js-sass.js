"use strict";
var isArray = Array.isArray;
/**
 * Convert a JS object to SASS
 * Credits to https://github.com/acdlite/json-sass
 * @example {color: 'red'} -> (color: red)
 * @param jsValue
 */
function JSToSASS(jsValue) {
    function _JSToSASS(value, initialIndentLevel) {
        if (initialIndentLevel === void 0) { initialIndentLevel = 0; }
        var indentLevel = initialIndentLevel;
        switch (typeof value) {
            case 'boolean':
            case 'number':
                return value.toString();
            case 'string':
                return value;
            case 'object':
                if (isObject(value)) {
                    indentLevel += 1;
                    var indent = indentsToSpaces(indentLevel);
                    var jsObj_1 = value;
                    var sassKeyValPairs = [];
                    sassKeyValPairs = Object.keys(jsObj_1).reduce(function (result, key) {
                        var jsVal = jsObj_1[key];
                        var sassVal = _JSToSASS(jsVal, indentLevel);
                        if (isNotUndefined(sassVal)) {
                            result.push(key + ": " + sassVal);
                        }
                        return result;
                    }, []);
                    var result = "(\n" + (indent + sassKeyValPairs.join(',\n' + indent)) + "\n" + indentsToSpaces(indentLevel - 1) + ")";
                    indentLevel -= 1;
                    return result;
                }
                else if (isArray(value)) {
                    var sassVals = [];
                    for (var i = 0; i < value.length; i++) {
                        var v = value[i];
                        if (isNotUndefined(v)) {
                            sassVals.push(_JSToSASS(v, indentLevel));
                        }
                    }
                    return '(' + sassVals.join(', ') + ')';
                }
                else if (isNull(value)) {
                    return 'null';
                }
                else {
                    return value.toString();
                }
            default:
                return;
        }
    }
    return _JSToSASS(jsValue);
}
function indentsToSpaces(indentCount) {
    return Array(indentCount + 1).join('  ');
}
function isObject(value) {
    return Object.prototype.toString.call(value) === '[object Object]';
}
function isNull(value) {
    return value === null;
}
function isNotUndefined(value) {
    return typeof value !== 'undefined';
}
module.exports = JSToSASS;
