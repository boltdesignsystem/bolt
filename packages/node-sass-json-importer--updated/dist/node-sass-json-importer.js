'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (url, prev) {
  if (!isJSONfile(url)) {
    return null;
  }

  var includePaths = this.options.includePaths ? this.options.includePaths.split(_path2.default.delimiter) : [];
  var paths = [].concat(prev.slice(0, prev.lastIndexOf('/'))).concat(includePaths);

  var file = paths.map(function (path) {
    return (0, _path.resolve)(path, url);
  }).filter(_isThere2.default).pop();

  if (!file) {
    return new Error('Unable to find "' + url + '" from the following path(s): ' + paths.join(', ') + '. Check includePaths.');
  }

  // Prevent file from being cached by Node's `require` on continuous builds.
  // https://github.com/Updater/node-sass-json-importer/issues/21
  delete require.cache[require.resolve(file)];

  try {
    return {
      contents: transformJSONtoSass(require(file))
    };
  } catch (e) {
    return new Error('node-sass-json-importer: Error transforming JSON to SASS. Check if your JSON parses correctly. ' + e);
  }
};

exports.isJSONfile = isJSONfile;
exports.transformJSONtoSass = transformJSONtoSass;
exports.parseValue = parseValue;
exports.parseList = parseList;
exports.parseMap = parseMap;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _isThere = require('is-there');

var _isThere2 = _interopRequireDefault(_isThere);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isJSONfile(url) {
  return (/\.json$/.test(url)
  );
}

function transformJSONtoSass(json) {
  return Object.keys(json).map(function (key) {
    return '$' + key + ': ' + parseValue(json[key]) + ';';
  }).join('\n');
}

function parseValue(value) {
  if (_lodash2.default.isArray(value)) {
    return parseList(value);
  } else if (_lodash2.default.isPlainObject(value)) {
    return parseMap(value);
  } else {
    console.log(value);

    return value;
  }
}

function parseList(list) {
  return '(' + list.map(function (value) {
    return parseValue(value);
  }).join(',') + ')';
}

function parseMap(map) {
  return '(' + Object.keys(map).map(function (key) {
    return key + ': ' + parseValue(map[key]);
  }).join(',') + ')';
}

// Super-hacky: Override Babel's transpiled export to provide both
// a default CommonJS export and named exports.
// Fixes: https://github.com/Updater/node-sass-json-importer/issues/32
// TODO: Remove in 3.0.0. Upgrade to Babel6.
module.exports = exports.default;
Object.keys(exports).forEach(function (key) {
  return module.exports[key] = exports[key];
});
