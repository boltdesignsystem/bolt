const Mapper = require('../Mapper');
const { RawObjectData } = require('../types');

module.exports = class JsonDecoder extends Mapper {

  async canMap(key, currentData, data) {
    return data.constructor.name == 'StringData';
  }

  async map(data) {
    return new RawObjectData(JSON.parse(data.value), data);
  }

}
