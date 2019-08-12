#!/usr/bin/env node
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const { upload } = require('now-storage');
const { promisify } = require('util');
const boxen = require('boxen');
const terminalLink = require('terminal-link');

const vrtScreenshots = [];

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

  onRunComplete(contexts, results) {
    const pathsToFailingTests = [];
    let summaryOfFailingTests = ``;
    let summaryOfVrtResults = ``;

    results.testResults.forEach(result => {
      if (result.numFailingTests >= 1) {
        pathsToFailingTests.push(
          `• ${path.relative(process.cwd(), result.testFilePath)}`,
        );
      }
    });

    const testSummary = `${chalk.bold('Jest Test Summary:')}
• Tests # of tests passing: ${chalk.green(results.numPassedTests)}
• Total # of tests failing: ${chalk.red.bold(results.numFailedTests)}
• Total # of tests:         ${chalk.bold(results.numTotalTests)}
    `;

    if (pathsToFailingTests.length >= 1) {
      summaryOfFailingTests = `
${chalk.bold('These are the paths to the Jest tests that are failing:')}
${pathsToFailingTests.join('\n')}
    `;
    }

    if (vrtScreenshots.length >= 1) {
      summaryOfVrtResults = `
${chalk.bold('These are the VRT diff screenshots for tests that are failing:')}
${vrtScreenshots.join('\n')}
      `;
    }

    console.log(
      boxen(testSummary + summaryOfFailingTests + summaryOfVrtResults, {
        padding: 1,
        margin: 1,
        borderStyle: 'double',
      }),
    );
  }

  onTestResult(test, testResult, aggregateResults) {
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

            // exit early so local Jest tests without the necessary now.sh token exit when a failure occurs
            if (!NOW_TOKEN) {
              const urlToDisplay = path.relative(
                process.cwd(),
                path.join(
                  testingDir,
                  `/__image_snapshots__/__diff_output__/${file}`,
                ),
              );
              resolve(urlToDisplay);
            } else {
              uploadImage(file, imageData).then(url => {
                const urlToDisplay = `https://${url}/${file}`;
                resolve(urlToDisplay);
              });
            }
          });
          allImagePromises.push(filePromise);
        });

        if (NOW_TOKEN) {
          return Promise.all(allImagePromises)
            .then(function(screenshotDiffs) {
              screenshotDiffs.forEach(screenshot => {
                vrtScreenshots.push(
                  `• ${terminalLink(
                    screenshot.substring(
                      screenshot.lastIndexOf('/') + 1,
                      screenshot.length,
                    ),
                    screenshot,
                  )}`,
                );
              });
              console.log(
                chalk.red.bold(
                  `Uploaded VRT image diff(s) to: \n${screenshotDiffs.join(
                    '\n',
                  )}`,
                ),
              );
              resolveAll(screenshotDiffs);
            })
            .catch(err => {
              console.log(
                chalk.red.bold(
                  `Error uploading image diff(s) to now.sh: ${err}`,
                ),
              );
            });
        } else {
          return Promise.all(allImagePromises)
            .then(function(screenshotDiffs) {
              screenshotDiffs.forEach(screenshot => {
                vrtScreenshots.push(
                  `• ${terminalLink(
                    screenshot.substring(
                      screenshot.lastIndexOf('/') + 1,
                      screenshot.length,
                    ),
                    screenshot,
                  )}`,
                );
              });

              resolveAll(screenshotDiffs);
            })
            .catch(err => {
              console.log(
                chalk.red.bold(
                  `Error encountered when processing local image VRT diff(s): ${err}`,
                ),
              );
            });
        }
      });
    }
  }
}

module.exports = JestScreenshotReporter;
