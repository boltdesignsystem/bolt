/* eslint-disable no-console */

const assert = require('assert');
const browserslist = require('browserslist');
const config = require('./index');

const browsers = browserslist(config);
assert(browsers.length > 0, 'Successfully resolves a list of browsers');

console.log('Bolt is currently supporting the following browsers:');
console.log(browsers.join('\n'));

/* eslint-enable no-console */
