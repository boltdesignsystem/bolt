const deepmerge = require('deepmerge');
const path = require('path');
const Reducer = require('../Reducer');
const { RawObjectData } = require('../types');

module.exports = class DeepMergeReducer extends Reducer {

  async canReduce(key, currentData, data) {
    return currentData.constructor.name === 'RawObjectData' && data.constructor.name === 'RawObjectData';
  }

  async reduce(currentData, data) {
    return new RawObjectData(deepmerge(currentData.value, data.value), data);
  }

}

