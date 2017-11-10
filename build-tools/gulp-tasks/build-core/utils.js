// const exec = require('child_process').exec;
// const merge = require('merge').recursive;
// const notifier = require('node-notifier');
// const yaml = require('js-yaml');
// const fs = require('fs');

/**
 * Flatten Array
 * @param arrayOfArrays {Array[]}
 * @returns {Array}
 */
function flattenArray(arrayOfArrays) {
  return [].concat.apply([], arrayOfArrays);
}
module.exports.flattenArray = flattenArray;


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
module.exports.uniqueArray = uniqueArray;
