const { isArray } = Array;

/**
 * Convert a JS object to SASS
 * Credits to https://github.com/acdlite/json-sass
 * @example {color: 'red'} -> (color: red)
 * @param jsValue
 */
function JSToSASS(jsValue) {
  function _JSToSASS(value, initialIndentLevel = 0) {
    let indentLevel = initialIndentLevel;

    switch (typeof value) {
      case 'boolean':
      case 'number':
        return value.toString();
      case 'string':
        return value;
      case 'object':
        if (isObject(value)) {
          indentLevel += 1;
          const indent = indentsToSpaces(indentLevel);

          const jsObj = value;
          let sassKeyValPairs: string[] = [];

          sassKeyValPairs = Object.keys(jsObj).reduce(
            (result, key: string) => {
              const jsVal = jsObj[key];
              const sassVal: string = _JSToSASS(jsVal, indentLevel);

              if (isNotUndefined(sassVal)) {
                result.push(`${key}: ${sassVal}`);
              }

              return result;
            },
            [] as string[]
          );

          const result = `(\n${indent + sassKeyValPairs.join(',\n' + indent)}\n${indentsToSpaces(indentLevel - 1)})`;
          indentLevel -= 1;
          return result;
        } else if (isArray(value)) {
          const sassVals: string[] = [];

          for (let i = 0; i < value.length; i++) {
            const v = value[i];
            if (isNotUndefined(v)) {
              sassVals.push(_JSToSASS(v, indentLevel));
            }
          }

          return '(' + sassVals.join(', ') + ')';
        } else if (isNull(value)) {
          return 'null';
        } else {
          return value.toString();
        }
      default:
        return;
    }
  }

  return _JSToSASS(jsValue);
}

function indentsToSpaces(indentCount: number) {
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
