const Reducer = require('../Reducer');

module.exports = class EmptyFileReducer extends Reducer {

  async reduce(currentData, data) {
    if (!this.isNull(currentData)&& this.isNull(data)) {
      return currentData;
    }

    if (!this.isNull(data) && this.isNull(currentData)) {
      return data;
    }

    return currentData;
  }

  isNull(data) {
    return data.constructor.name === 'NullData';
  }

}
