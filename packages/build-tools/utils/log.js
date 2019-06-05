const chalk = require('chalk');

// @todo Can we have emojis? How does `yarn` handle it?

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
 * Logs a dim message to Terminal
 * @param {string} msg
 */
function dim(msg) {
  console.log(chalk.dim(msg));
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
 * @param {string} msg - Message
 * @param {*} logMe - Passed to `console.log`
 */
function errorAndExit(msg, logMe) {
  // @todo Only trigger if `verbosity > 1`
  if (logMe) {
    // Adding some empty lines before error message for readability
    console.log();
    console.log();
    console.log(logMe);
  }
  error(`Error: ${msg}`);

  // There's a few ways to handle exiting

  // This is suggested and it's nice b/c it let's I/O finish up, but if an error happens on a watch task, it doesn't exit, b/c this will exit once the event loop is empty.
  // process.exitCode = 1;

  // This stops everything instantly and guarantees a killed program, but there's comments on the InterWebs about how it can be bad b/c I/O (like file writes) might not be done yet. I also have suspicions that this can lead to child processes never getting killed and running indefinitely - perhaps what leads to ports not being available
  // process.exit(1);

  // From docs for `process.nextTick` : "Once the current turn of the event loop turn runs to completion, all callbacks currently in the next tick queue will be called. This is not a simple alias to setTimeout(fn, 0). It is much more efficient. It runs before any additional I/O events (including timers) fire in subsequent ticks of the event loop."
  // This exits during watches correctly, and I *think* it'll let the I/O finish, but I'm not 100%
  process.nextTick(() => {
    process.exit(1);
  });
}

/**
 * Logs that a task started
 * @param {string} task
 */
function taskStart(task) {
  console.log(
    chalk.blue(`
===
Task Started: ${task}
VVV

  `),
  );
}

/**
 * Logs that a task is done
 * @param {string} task
 */
function taskDone(task) {
  console.log(
    chalk.green(`

^^^
Task Done: ${task}
===`),
  );
}

/**
 * Displays big Bolt intro ASCII art
 */
function intro() {
  // @TODO: How best to pull in .scss color data export to reference branch colors below?
  const i = chalk.hex('#545DA6'); // indigo, light
  const y = chalk.hex('#ffcc4d'); // yellow, base
  const o = chalk.hex('#E84B17');
  const t = chalk.hex('#009999');
  const w = chalk.hex('#FFFFFF');

  const CLI_TITLE = chalk.bold.underline('Bolt Design System CLI');
  const CLI_USAGE = 'Usage: `bolt <command> [options ...]`';
  const HELP_USAGE = 'Help: `bolt -h` or `bolt <command> --help`';

  const HELP_HEADER = `
        ${o('__________')}${y('___________')}
       ${o('/ttttttt|')}  ${y('|BCCCCCCCL;\\')}
      ${o('/;ttttttt|')}  ${y('|CCCCCCCCLi.\\')}
     ${o('/,iiiiiiii|')}  ${y('|11111111111:\\')}
    ${o('/_______')}  ${y('_________')}  ${w('_______\\')}
   ${o('/,1ttttt|')} ${y('|fCCCCCCCC|')} ${w('|C0000C:\\')}     ${CLI_TITLE}
  ${o('/:ttttttt|')} ${y('|fCCCCCCCC|')} ${w('|888888Gi\\')}
 ${o('/:::::::::|')} ${y('|;;;;;;;;;|')} ${w('|11111111i\\')}   ${CLI_USAGE}
 ${i('\\:;;;;;;;;;;;|')} ${t('|::::::::::::::::::/')}           ${HELP_USAGE}
  ${i('\\:tfffffffff|')} ${t('|ttttttttttttttt1:/')}
   ${i('\\,1ffffffft|')} ${t('|tttttttttttttti,/')}
    ${i('\\¯¯¯¯¯¯¯¯¯¯')}  ${t('¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯/')}
     ${i('\\,iiiiiiiiiiii|')} ${t('|iiiiiii1,/')}
      ${i('\\.;ffffffffff|')} ${t('|ttttttt;/')}
       ${i('\\:tfffffffff|')} ${t('|ttttt1:/')}
        ${i('¯¯¯¯¯¯¯¯¯¯¯¯')}${t('¯¯¯¯¯¯¯¯¯')}
`;

  info(HELP_HEADER);
}

module.exports = {
  success,
  info,
  warning,
  error,
  errorAndExit,
  taskStart,
  taskDone,
  intro,
  dim,
};
