import _               from 'lodash';
import path, {resolve} from 'path';
import isThere         from 'is-there';

export default function(url, prev) {
  if (!isJSONfile(url)) {
    return null;
  }

  let includePaths = this.options.includePaths ? this.options.includePaths.split(path.delimiter) : [];
  let paths = []
    .concat(prev.slice(0, prev.lastIndexOf('/')))
    .concat(includePaths);

  let file = paths
    .map(path => resolve(path, url))
    .filter(isThere)
    .pop();

  if (!file) {
    return new Error(`Unable to find "${url}" from the following path(s): ${paths.join(', ')}. Check includePaths.`);
  }

  // Prevent file from being cached by Node's `require` on continuous builds.
  // https://github.com/Updater/node-sass-json-importer/issues/21
  delete require.cache[require.resolve(file)];

  try {
    return {
      contents: transformJSONtoSass(require(file))
    };
  } catch(e) {
    return new Error(`node-sass-json-importer: Error transforming JSON to SASS. Check if your JSON parses correctly. ${e}`);
  }
}

function sanitizeString(sassValue) {
  if ('"' === sassValue || !('"' === sassValue[0] && '"' === sassValue.slice(-1))){
    sassValue = '"' + sassValue + '"';
  }
  return sassValue;
}


export function isJSONfile(url) {
  return /\.json$/.test(url);
}

export function transformJSONtoSass(json) {
  return Object.keys(json)
    .map(key => `$${key}: ${parseValue(json[key])};`)
    .join('\n');
}

export function parseValue(value) {
  if (_.isArray(value)) {
    return parseList(value);
  } else if (_.isPlainObject(value)) {
    return parseMap(value);
  } else {
    return sanitizeString(value);
  }
}

export function parseList(list) {
  return `(${list
    .map(value => parseValue(value))
    .join(',')})`;
}

export function parseMap(map) {
  return `(${Object.keys(map)
    .map(key => `${sanitizeString(key)}: ${parseValue(map[key])}`)
    .join(',')})`;
}

// Super-hacky: Override Babel's transpiled export to provide both
// a default CommonJS export and named exports.
// Fixes: https://github.com/Updater/node-sass-json-importer/issues/32
// TODO: Remove in 3.0.0. Upgrade to Babel6.
module.exports = exports.default;
Object.keys(exports).forEach(key => module.exports[key] = exports[key]);
