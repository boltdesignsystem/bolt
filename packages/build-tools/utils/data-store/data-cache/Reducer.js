module.exports = class Reducer {
  async canReduce(key, currentData, data) {
    return true;
  }

  async reduce(currentData, data) {
    return currentData;
  }
};
