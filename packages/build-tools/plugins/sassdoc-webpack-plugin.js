// Ported over and forked from the original version by https://github.com/oddbird/sassdoc-theme-herman/blob/master/sassdoc-webpack-plugin.js

/* eslint-disable no-sync, no-console */

'use strict';

const fs = require('fs');
const path = require('path');
const sassdoc = require('sassdoc');
const yaml = require('js-yaml');

class SassDocPlugin {
  constructor(options, pluginOptions) {
    if (!options) {
      try {
        // Load .sassdocrc configuration
        options = yaml.safeLoad(
          fs.readFileSync(path.join(process.cwd(), '.sassdocrc'), 'utf-8'),
        );
      } catch (err) {
        console.warn(err);
        throw new Error(`Invalid or no .sassdocrc found in: ${process.cwd()}`);
      }
    }

    if (!options.src) {
      throw new Error('SassDoc Webpack Plugin: `src` is not defined');
    }

    this.options = options;
    this.pluginOptions = pluginOptions;
  }

  apply(compiler) {
    const self = this;

    compiler.hooks.afterEmit.tapPromise('SassDocPlugin', compilation => {
      return sassdoc.parse(self.options.src, self.options).then(function(data) {
        fs.writeFile(self.options.dest, JSON.stringify(data), 'utf8', err => {
          if (err) throw err;
        });
      });
    });
  }
}

module.exports = SassDocPlugin;
