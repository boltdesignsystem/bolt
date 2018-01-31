const chalk = require('chalk');
const { exec } = require('child_process');
const notifier = require('node-notifier');

/**
 * Run shell command
 * @param cmd {string} - Command to run
 * @param exitOnError {boolean} - If that should exit non-zero or carry one.
 * @param streamOutput {boolean} - Should output be sent to stdout as it happens? It always gets passed to resolve at end.
 */
async function sh(cmd, exitOnError, streamOutput) {
  return new Promise((resolve, reject) => {
    const child = exec(cmd, {
      encoding: 'utf8',
      timeout: 1000 * 60 * 2, // 2 min; just want to make sure nothing gets detached forever.
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
        if (exitOnError) {
            process.exitCode = 1;
            reject(new Error(`Error with code ${code} after running: ${cmd}\n ${output}`));
        } else {
          notifier.notify({
            title: cmd,
            message: output,
            sound: true,
          });
          reject(chalk.red(`Error with code ${code} after running: ${cmd}\n`) + output);
        }
      }
      resolve(output);
    });
  });

}

module.exports = sh;
