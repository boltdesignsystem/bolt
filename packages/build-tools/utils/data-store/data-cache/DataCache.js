module.exports = class DataCache extends Map {
  constructor(merger) {
    super();
    this.merger = merger;
  }

  async set(key, value) {
    value = await this.merger.merge(key, this.get(key), value);
    Map.prototype.set.call(this, key, value);
    return value;
  }
};
