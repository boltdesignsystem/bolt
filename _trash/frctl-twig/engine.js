/*
The MIT License (MIT)

Copyright (c) 2015 Bitmade

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

const execPHP = require('../exec-php');
const trim = require('trim');

const twigOptions = {
  root: null,
  extensions: [],
  context: {}
};

exports.renderFile = function (entry, options, cb) {
  // Merge the global options with the local ones.
  options = Object.assign({}, twigOptions, options);

  // console.log(options);

  execPHP('engine.php', null, function (error, php) {
    // Call the callback on error or the render function on success.
    error ? cb(error) : php.render(entry, options, function (error, stdout) {
      // Call the callback with an error or the trimmed output.
      error ? cb(error) : cb(null, trim(stdout));
    });
  });
};

exports.createEngine = function (options) {
  // Merge the options with default options.
  twigOptions = Object.assign(twigOptions, options);

  return exports.renderFile;
};

exports.__express = exports.renderFile;
