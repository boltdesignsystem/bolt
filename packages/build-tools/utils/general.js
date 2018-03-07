const fs = require('fs');

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

/**
 * Ensure a file exists
 * We don't want to do anything with the file now, we just want to provide an early error if a path is wrong.
 * This is called async and by the time an error is thrown, we may be several steps ahead with WebPack probably already trying to start - that's ok, we don't want to hold up the process everytime things are correct.
 * @param filePath {string} - Path to file to ensure exists
 */
function ensureFileExists(filePath) {
  fs.access(filePath, (err) => {
    if (err) {
      log.errorAndExit(`This file ^^^ does not exist and it was referenced in package.json for that component, please make sure the file path is correct.`, filePath);
    }
  });
}


module.exports = {
  flattenArray,
  concatArrays,
  uniqueArray,
  ensureFileExists,
};
