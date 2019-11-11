const Matcher = require('../Matcher');

module.exports = class MatchDataFormat extends Matcher {

  constructor(format) {
    super();
    this.format = format;
  }

  async match(key, currentData, data) {
    return !!data.getFrames(frame => frame.constructor.name === this.format);
  }

}
