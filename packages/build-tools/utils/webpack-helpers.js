const chalk = require('chalk');
const ora = require('ora');
const formatWebpackMessages = require('./formatWebpackMessages');

let webpackBuildPercentComplete = 0; // shared webpack build % complete
let initialWebpackBuild = true; // tracks whether or not this is the first time we're compiling webpack (used for state-specific terminal messages)
let startTime;

function getWebpackText() {
  return initialWebpackBuild === true ? `Compiling` : `Recompiling`;
}

const webpackSpinner = ora(chalk.blue(`${getWebpackText()} Webpack...`));

function boltWebpackMessages(originalCompiler) {
  const updatedCompiler = originalCompiler;

  for (const comp of updatedCompiler.compilers) {
    /* eslint-disable-next-line */
    comp.hooks.compile.tap('WebpackServe', () => {
      webpackSpinner.start();
      startTime = new Date();
    });

    /* eslint-disable-next-line */
    comp.hooks.done.tap('WebpackServe', stats => {
      const hasErrors = stats.hasErrors();
      var now = new Date();
      var buildTime = (now - startTime) / 1000 + 's';
      // const hasWarnings = stats.hasWarnings();
      // stats.toJson() has a high time-cost for large projects
      // only run that if there are listeners AND there are
      // problems with the build (#181)
      if (hasErrors) {
        const messages = formatWebpackMessages(stats.toJson({}, true));
        webpackSpinner.fail(chalk.red(`${getWebpackText()} Webpack failed!`));
        const prettyError = chalk.red(messages.errors.join('\n\n'));
        console.log(prettyError);
      } else {
        const output = stats.toString({
          all: false, // Makes the build much quieter
          colors: true, // Shows colors in the console
          errors: true,
          moduleTrace: true,
        });

        webpackSpinner.succeed(
          chalk.green(
            `${
              initialWebpackBuild ? 'Compiled' : 'Recompiled'
            } Webpack in ${buildTime}`,
          ),
        );

        initialWebpackBuild = false;
      }
    });
  }

  return updatedCompiler;
}

const boltWebpackProgress = (percentage, message, ...args) => {
  // e.g. Output each progress message directly to the console:  console.info(percentage, message, ...args);
  if (percentage !== 1) {
    const percent = percentage * 100;
    webpackBuildPercentComplete = percent.toFixed(1);
    webpackSpinner.text = `${getWebpackText()} Webpack... ${webpackBuildPercentComplete}%`;
  } else {
    webpackBuildPercentComplete = 100.0;
  }
};

module.exports = {
  boltWebpackProgress,
  boltWebpackMessages,
};
