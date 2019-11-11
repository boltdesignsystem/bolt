module.exports = class Mapper {
  async canMap(key, currentData, data) {
    return true;
  }

  async map(data) {
    return data;
  }
};
