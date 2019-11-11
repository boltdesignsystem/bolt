const path = require('path');
const Data = require('../Data');

module.exports = class TextFileData extends Data {

  constructor(filepath, previous) {
    super(filepath, previous);
    this.filepath = filepath;
    this.filename = path.basename(filepath);
  }
}
