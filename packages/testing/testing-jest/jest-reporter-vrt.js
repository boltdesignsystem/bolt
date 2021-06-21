#!/usr/bin/env node
const chalk = require('chalk');
const path = require('path');
const boxen = require('boxen');

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

    console.log(
      boxen(testSummary + summaryOfFailingTests + summaryOfVrtResults, {
        padding: 1,
        margin: 1,
        borderStyle: 'double',
      }),
    );
  }
}

module.exports = JestScreenshotReporter;
