#!/usr/bin/env node
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const { upload } = require('now-storage');
const { promisify } = require('util');

async function uploadImage(name, content) {
  const { url } = await upload(process.env.NOW_TOKEN, {
    name,
    content,
  });
  return url;
}

const NOW_TOKEN = process.env.NOW_TOKEN;
// let filesToUpload = [];

// async function finishUploading() {
//   const { url } = await multiUpload(process.env.NOW_TOKEN, filesToUpload, {
//     deploymentName: 'bolt-jest-vrt',
//   });
//   return url;
// }
async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    // eslint-disable-next-line no-await-in-loop
    await callback(array[index], index, array);
  }
}

class JestScreenshotReporter {
  constructor(globalConfig, options) {
    this._globalConfig = globalConfig;
    this._options = options;
  }

  onTestResult(test, testResult, aggregateResults) {
    // if (!process.env.NOW_TOKEN) return false;
    if (
      testResult.numFailingTests &&
      testResult.failureMessage.match(/different from snapshot/)
    ) {
      return new Promise(async (resolveAll, reject) => {
        const allImagePromises = [];

        const testingDir = path.dirname(testResult.testFilePath);
        const filesToProcess = fs.readdirSync(
          path.join(testingDir, '/__image_snapshots__/__diff_output__/'),
        );

        filesToProcess.forEach(file => {
          const filePromise = new Promise(async function(resolve, reject) {
            const imageData = fs.readFileSync(
              path.join(
                testingDir,
                `/__image_snapshots__/__diff_output__/${file}`,
              ),
            );
            uploadImage(file, imageData).then(url => {
              const urlToDisplay = `https://${url}/${file}`;
              resolve(urlToDisplay);
            });
          });
          allImagePromises.push(filePromise);
        });
        return Promise.all(allImagePromises)
          .then(function(values) {
            console.log(
              chalk.red.bold(
                `Uploaded image diff(s) to: \n${values.join('\n')}`,
              ),
            );
            resolveAll(values);
          })
          .catch(err => {
            console.log(
              chalk.red.bold(`Error uploading image diffs to now.sh: ${err}`),
            );
          });
      });
    }
  }
}

module.exports = JestScreenshotReporter;
