const fs = require('fs');
const Mapper = require('../Mapper');
const { NullData, StringData } = require('../types');

module.exports = class FileLoader extends Mapper {

  async canMap(key, currentData, data) {
    return data.constructor.name === 'TextFileData';
  }

  async map(data) {
    return new Promise(async resolve => {
      fs.readFile(data.filepath, (err, fileData) => {
        resolve(err ? new NullData(data) : new StringData(fileData.toString(), data));
      });
    });
  }

}
