const path = require('path');
const Reducer = require('../Reducer');

module.exports = class TwigNamespaceReducer extends Reducer {
  async reduce(currentData, data) {
    // @todo: pull this logic from pega_bolt_theme.
    return currentData;
  }
};
