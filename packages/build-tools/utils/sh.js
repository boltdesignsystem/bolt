const chalk = require('chalk');
const notifier = require('node-notifier');
const execa = require('execa');

/**
 * Run shell command
 * @param cmd {string} - Command to run
 * @param exitOnError {boolean} - If that should exit non-zero or carry one.
 * @param streamOutput {boolean} - Should output be sent to stdout as it happens? It always gets passed to resolve at end.
 * @param showCmdOnError {boolean} - If error, should `cmd` be shown?
 */
async function sh(cmd, exitOnError, streamOutput, showCmdOnError = true) {
  return new Promise((resolve, reject) => {
    const child = execa.shell(cmd, {
      encoding: 'utf8',
    });
    let output = '';
    child.stdout.on('data', (data) => {
      output += data;
      if (streamOutput) {
        process.stdout.write(data);
      }
    });
    child.stderr.on('data', (data) => {
      output += data;
      if (streamOutput) {
        process.stdout.write(data);
      }
    });
    child.on('close', (code) => {
      if (code > 0) {
        const errorMsg = chalk.red(`
Error with code ${code}${showCmdOnError ? ` after running: ${cmd}`: ''}:
`);
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
