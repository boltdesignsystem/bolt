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

const isTravis = process.env.TRAVIS;
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
    this.allImagePromises = [];
  }

  async onTestResult(test, testResult, aggregateResults) {
    const self = this;
    if (
      testResult.numFailingTests &&
      testResult.failureMessage.match(/different from snapshot/)
    ) {
      await new Promise(async (resolve, reject) => {
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
            if (NOW_TOKEN) {
              await uploadImage(file, imageData).then(url => {
                const urlToDisplay = `https://${url}/${file}`;
                resolve(urlToDisplay);
              });
            } else {
              resolve(
                `${path.join(
                  testingDir,
                  `/__image_snapshots__/__diff_output__/${file}`,
                )}`,
              );
            }
          });
          resolve(self.allImagePromises.push(filePromise));
        });
      });
    }
  }

  onRunComplete(contexts, results) {
    if (NOW_TOKEN && this.allImagePromises.length > 0) {
      return Promise.all(this.allImagePromises)
        .then(function(values) {
          console.log(
            chalk.red.bold(`Uploaded image diff(s) to: \n${values.join('\n')}`),
          );
        })
        .catch(err => {
          console.log(
            chalk.red.bold(`Error uploading image diffs to now.sh: ${err}`),
          );
        });
    }
  }
}

module.exports = JestScreenshotReporter;
