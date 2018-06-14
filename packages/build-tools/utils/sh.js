const chalk = require('chalk');
const notifier = require('node-notifier');
const execa = require('execa');
var PrettyError = require('pretty-error');
var pe = new PrettyError();
pe.skipPackage('next_tick.js', 'sh.js');
pe.skipNodeFiles();


/**
 * Run shell command
 * @param cmd {string} - Command to run
 * @param exitOnError {boolean} - If that should exit non-zero or carry one.
 * @param streamOutput {boolean} - Should output be sent to stdout as it happens? It always gets passed to resolve at end.
 * @param showCmdOnError {boolean} - If error, should `cmd` be shown?
 */
async function sh(cmd, exitOnError, streamOutput, showCmdOnError = true) {
  return new Promise((resolve, reject) => {

    execa.shell(cmd, {
      encoding: 'utf8',
    }).then(result => {
      resolve(result.stdout);
    }).catch(error => {
      if (error.code > 0) {
//         const errorCommand = chalk.red(`
// Error with code ${error.code}${showCmdOnError ? ` after running: ${error.cmd}`: ''}:
// `);

        var renderedError = pe.render(new Error(`${error.stdout}`));
        reject(renderedError);

        // const errorMessage = chalk.white(`${error.message}`);

        // console.log(errorMessage);

        // if (exitOnError) {
        //   process.exitCode = 1;
        //   reject(new Error(errorMsg + errorMessage));
        // } else {
        //   notifier.notify({
        //     title: cmd,
        //     message: error.message,
        //     sound: true,
        //   });
        //   reject(error.message);
        // }
      }
    });
  });

}

module.exports = sh;
