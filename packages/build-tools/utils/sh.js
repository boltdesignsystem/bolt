const chalk = require('chalk');
const execa = require('execa');
const notifier = require('node-notifier');

/**
 * Run shell command
 * @param cmd {string} - Command to run
 * @param args {string[]} - args to pass to `cmd`
 * @param exitOnError {boolean} - If that should exit non-zero or carry one.
 * @param streamOutput {boolean} - Should output be sent to stdout as it happens? It always gets passed to resolve at end.
 * @param showCmdOnError {boolean} - If error, should `cmd` be shown?
 */
async function sh(cmd, args, exitOnError, streamOutput, showCmdOnError = true) {
  return new Promise((resolve, reject) => {
    console.log(cmd, args);
    const child = execa(cmd, args);

    if (streamOutput) {
      child.stdout.pipe(process.stdout);
    }

    child.then((results) => {
      const { code, stdout, stderr, message } = results;
      const output = stderr + '\n\n' + stdout;
      if (code > 0) {
        const errorMsg = chalk.red(showCmdOnError ? message : `Error with code ${code}`);
        if (exitOnError) {
          process.exitCode = 1;
          reject(new Error(errorMsg + output));
        } else {
          notifier.notify({
            title: cmd,
            message: output,
            sound: true,
          });
          reject(errorMsg + output);
        }
      }
      resolve(output);
    });
  });

}

module.exports = sh;
