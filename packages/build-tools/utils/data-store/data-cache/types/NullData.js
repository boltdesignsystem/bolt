const Data = require('../Data');

module.exports = class NullData extends Data {
  constructor() {
    super(null);
  }
};
