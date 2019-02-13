#!/usr/bin/env node
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const { upload } = require('now-storage');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);

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

async function uploadImage(name, content) {
  const { url } = await upload(process.env.NOW_TOKEN, {
    name,
    content,
  });
  return url;
}

class ImageReporter {
  constructor(globalConfig, options) {
    this._globalConfig = globalConfig;
    this._options = options;
  }

  onTestResult(test, testResult, aggregateResults) {
    if (
      testResult.numFailingTests &&
      testResult.failureMessage.match(/different from snapshot/)
    ) {
      const testingDir = path.dirname(testResult.testFilePath);
      const filesToProcess = fs.readdirSync(
        path.join(testingDir, '/__image_snapshots__/__diff_output__/'),
      );
      
      const start = async () => {
        await asyncForEach(filesToProcess, async (value) => {
          readFile(
            path.join(
              testingDir,
              `/__image_snapshots__/__diff_output__/${value}`,
            ),
          ).then(async imageData => {
            const url = await uploadImage(value, imageData);
            console.log(url);
              // .then(url => resolveInner(console.log(url)))
              // .catch(error => console.error(error));
          });
        });
        console.log('Done');
      }
      start();

      // const start = async () => {
      //   await asyncForEach([1, 2, 3], async num => {
      //     await waitFor(50);
      //     console.log(num);
      //   });
      //   console.log('Done');
      // };
      // start();

      // return new Promise(resolve => {
      //   filesToProcess.forEach(value => {
      //     return new Promise(resolveInner => {
            
      //     });
      //   });
      // });
      // // filesToUpload.push({
      // //   name: imageName,
      // //   content: imageData,
      // // });
      // try {
      //   const { url } = upload(
      //     process.env.NOW_TOKEN,
      //     {
      //       name: imageName,
      //       content: imageData,
      //     },
      //     { deploymentName: 'bolt-jest-vrt', teamId: 'bolt-design-system' },
      //   ).then()
      //   console.log(chalk.red.bold(`Uploaded image diff file to ${url}`));
      // } catch (err) {
      //   console.log(
      //     chalk.red.bold(`Error uploading image diff to now.sh: ${err}`),
      //   );
      // }

      // try {
      //   const url = upload(
      //     process.env.NOW_TOKEN,
      //     {
      //       name: imageName,
      //       content: imageData,
      //     },
      //     { deploymentName: 'bolt-jest-vrt', teamId: 'bolt-design-system' },
      //   );
      //   chalk.red.bold(`Uploaded image diff file to ${url}`);
      // }
      // catch(err){
      //   chalk.red.bold(`Error uploading image diff to now.sh: ${error}`),
      // }
      // return chalk.red.bold(`Uploaded image diff file to ${url}`);
      // batchUpload.push(
      //     .then(url => chalk.red.bold(`Uploaded image diff file to ${url}`))
      //     .catch(error =>
      //       chalk.red.bold(`Error uploading image diff to now.sh: ${error}`),
      //     ),
    }
  }
}

module.exports = ImageReporter;
