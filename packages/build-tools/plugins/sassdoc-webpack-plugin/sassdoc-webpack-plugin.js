// Ported over and forked from the original version by https://github.com/oddbird/sassdoc-theme-herman/blob/master/sassdoc-webpack-plugin.js

/* eslint-disable no-sync, no-console */
'use strict';

const fs = require('fs');
const path = require('path');
const sassdoc = require('sassdoc');
const yaml = require('js-yaml');
const crypto = require('crypto');
const { BoltCache } = require('@bolt/build-utils/cache');

class SassDocPlugin {
  constructor(options, pluginOptions) {
    if (!options) {
      try {
        // Load .sassdocrc configuration
        options = yaml.safeLoad(
          fs.readFileSync(path.join(__dirname, '.sassdocrc'), 'utf-8'),
        );
      } catch (err) {
        console.warn(err);
        throw new Error(`Invalid or no .sassdocrc found in: ${__dirname}`);
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

    compiler.hooks.afterEmit.tapPromise('SassDocPlugin', (compilation) => {
      return sassdoc
        .parse(self.options.src, self.options)
        .then(function (data) {
          function getHash(data) {
            return crypto
              .createHash('md5')
              .update(JSON.stringify(data))
              .digest('hex');
          }

          function writeSassdocFile(file, data) {
            fs.writeFile(file, JSON.stringify(data), 'utf8', (err) => {
              if (err) throw err;
            });
          }

          // If cached Sassdoc data exists, compare hashes to only write to disk when absolutely necessary
          if (BoltCache.get('sassdoc')) {
            const newData = getHash(data);
            const oldData = getHash(BoltCache.get('sassdoc'));

            if (oldData !== newData) {
              //if (config.verbosity > 3) {
              //  console.log(`Sassdoc data has changed -- writing new file.`);
              //}
              BoltCache.set('sassdoc', data);
              writeSassdocFile(self.options.dest, data);
            } else {
              //if (config.verbosity > 3) {
              //  console.log(`Sassdoc data hasn't changed...`);
              //}
            }
          } else {
            // Otherwise write to disk + cache results the first time Sassdoc generates data
            BoltCache.set('sassdoc', data);
            writeSassdocFile(self.options.dest, data);
          }
        });
    });
  }
}

module.exports = SassDocPlugin;
