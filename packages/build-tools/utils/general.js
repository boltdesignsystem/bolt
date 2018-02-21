/**
 * Flatten Array
 * @param arrayOfArrays {Array[]}
 * @returns {Array}
 */
function flattenArray(arrayOfArrays) {
  return [].concat.apply([], arrayOfArrays);
}

/**
 * Concat Arrays together
 * @param {Array} a - First Array
 * @param {Array} b - Second Array
 * @returns {Array} - The two arrays together.
 */
function concatArrays(a, b) {
  return [].concat(a, b);
}

/**
 * Make an array unique by removing duplicate entries.
 * @param item {Array}
 * @returns {Array}
 */
function uniqueArray(item) {
  const u = {};
  const newArray = [];
  for (let i = 0, l = item.length; i < l; ++i) {
    if (!{}.hasOwnProperty.call(u, item[i])) {
      newArray.push(item[i]);
      u[item[i]] = 1;
    }
  }
  return newArray;
}

module.exports = {
  flattenArray,
  concatArrays,
  uniqueArray,
};
