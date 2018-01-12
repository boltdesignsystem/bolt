const chalk = require('chalk');

/**
 * Logs a successful message to Terminal
 * @param {string} msg
 */
function success(msg) {
  console.log(chalk.green(msg));
}

/**
 * Logs a info message to Terminal
 * @param {string} msg
 */
function info(msg) {
  console.log(chalk.blue(msg));
}

/**
 * Logs a warning message to Terminal
 * @param {string} msg
 */
function warning(msg) {
  console.log(chalk.yellow(msg));
}

/**
 * Logs an error message to Terminal
 * @param {string} msg
 */
function error(msg) {
  console.log(chalk.red(msg));
}

/**
 * Displays info, an error message, and then exits the cli
 * @param {string} - Message
 * @param {*} logMe - Passed to `console.log`
 */
function errorAndExit(msg, logMe) {
  // @todo Only trigger if `verbosity > 1`
  if (logMe) {
    console.log(logMe);
  }
  error(`Error: ${msg}`);
  process.exit(1);
}

/**
 * Logs that a task started
 * @param {string} task
 */
function taskStart(task) {
  console.log(chalk.blue(`
===
Task Started: ${task}
VVV
  
  `));
}

/**
 * Logs that a task is done
 * @param {string} task
 */
function taskDone(task) {
  console.log(chalk.green(`

^^^
Task Done: ${task}
===`));
}


module.exports = {
  success,
  info,
  warning,
  error,
  errorAndExit,
  taskStart,
  taskDone,
};
