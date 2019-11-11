const Matcher = require('../Matcher');

module.exports = class MatchKey extends Matcher {
  constructor(comparator) {
    super();

    if (typeof comparator === 'string') {
      this.comparator = key => key === comparator;
    } else if (comparator instanceof RegExp) {
      this.comparator = key => comparator.test(key);
    } else {
      this.comparator = comparator;
    }
  }

  async match(key, currentData, data) {
    return this.comparator(key);
  }
};
