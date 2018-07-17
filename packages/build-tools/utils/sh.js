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
 * @param exitImmediately {boolean} - If an exit is about to happen, should it happen immediately or at the end of the call stack at next tick?
 */
async function sh(
  cmd,
  args,
  exitOnError,
  streamOutput,
  showCmdOnError = true,
  exitImmediately = false,
) {
  return new Promise((resolve, reject) => {
    const child = execa(cmd, args);
    let output = '';

    if (streamOutput) {
      child.stdout.pipe(process.stdout);
      child.stderr.pipe(process.stderr);
    }

    child.stdout.on('data', data => {
      output += data;
      if (streamOutput) {
        process.stdout.write(data);
      }
    });

    child.stderr.on('data', data => {
      output += data;
      if (streamOutput) {
        process.stdout.write(data);
      }
    });

    child.on('close', code => {
      if (code > 0) {
        const errorMsg = chalk.red(`
          Error with code ${code}${
          showCmdOnError ? ` after running: ${cmd}` : ''
        }:
        `);

        if (exitOnError) {
          if (exitImmediately) {
            console.error(errorMsg + output);
            process.exit(1);
          }

          process.exitCode = 1;
          reject(new Error(errorMsg + output));
        } else {
          notifier.notify({
            title: cmd,
            message: output,
            sound: true,
          });

          // eslint-disable-next-line prefer-promise-reject-errors
          reject(errorMsg + output);
        }
      }
      resolve(output);
    });
  });
}

module.exports = sh;
