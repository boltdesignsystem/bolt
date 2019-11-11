const fs = require('fs');
const { NullData } = require('./types');

module.exports = class DataMerger {

  constructor(opts) {
    this.rules = opts.rules || {};

    Object.values(this.rules).forEach(rule => {
      rule.match = rule.match || [];
      rule.map = rule.map || [];
      rule.reduce = rule.reduce || [];
    });
  }

  async merge(key, currentData, data) {
    currentData = this._formatData(currentData);
    data = this._formatData(data);

    for (const rule of Object.values(this.rules)) {
      if (await this._matchRule(rule, key, currentData, data)) {
        data = await this._mapData(rule, key, currentData, data);
        currentData = await this._reduceData(rule, key, currentData, data);

        if (rule.final) {
          break;
        }
      }
    }

    return currentData;
  }

  async _matchRule(rule, key, currentData, data) {
    for (const matcher of rule.match) {
      if (!await matcher.match(key, currentData, data)) {
        return false;
      }
    }

    return true;
  }

  async _mapData(rule, key, currentData, data) {
    for (const mapper of rule.map) {
      if (await mapper.canMap(key, currentData, data)) {
        data = await mapper.map(data);
      }
    }
    return data;
  }

  async _reduceData(rule, key, currentData, data) {
    let result = currentData;

    for (const reducer of rule.reduce) {
      if (await reducer.canReduce(key, currentData, data)) {
        result = this._formatData(await reducer.reduce(result, data));
      }
    }

    return result;
  }

  _formatData(data) {
    if (data === false || typeof data === 'undefined') {
      return new NullData();
    }
    else {
      return data;
    }
  }

}
