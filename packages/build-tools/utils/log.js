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
    console.log(logMe);
  }
  error(`Error: ${msg}`);
  process.exitCode = 1;
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

/**
 * Displays big Bolt intro ASCII art
 */
function intro() {
  // @TODO: How best to pull in .scss color data export to reference branch colors below?
  const b = chalk.hex('#545DA6'); // indigo, light
  const y = chalk.hex('#ffcc4d'); // yellow, base

  const CLI_TITLE = chalk.bold.underline('Bolt-CLI');
  const CLI_DESCRIPTION = 'Welcome to the Bolt CLI ⚡️  Have fun!';
  const CLI_USAGE = 'Usage: \`bolt <command> [options ...]\`';
  const HELP_USAGE = 'Help: \`bolt --help\` or \`bolt <command> --help\`';

// const HELP_HEADER_BACKUP = `
//     /˜˜˜˜˜˜˜˜˜˜˜˜\
//    / /˜˜˜˜/|˜˜˜˜\ \
//   / /    / |     \ \
//  / /    /  |____  \ \
// / /    /       /   \ \
// \ \   /____   /    / /
//  \ \      |  /    / /
//   \ \     | /    / /
//    \ \____|/____/ /
//     \____________/
// `

// ^ Colorized + partially filled in version of logo above
  const HELP_HEADER = `
    ${b('///////|\\\\\\\\\\\\')}
   ${b('///˜˜˜˜')}${y('/|')}${b('˜˜˜˜\\\\\\')}
  ${b('///    ')}${y('//|')}${b('     \\\\\\')}     ${CLI_TITLE}
 ${b('///    ')}${y('///|____')}${b('  \\\\\\')}
${b('///    ')}${y('/////////')}${b('   \\\\\\')}   ${CLI_DESCRIPTION}
${b('\\\\\\   ')}${y('/////////')}${b('    ///')}
 ${b('\\\\\\      ')}${y('|///')}${b('    ///')}    ${CLI_USAGE}
  ${b('\\\\\\     ')}${y('|//')}${b('    ///')}     ${HELP_USAGE}
   ${b('\\\\\\____')}${y('|/')}${b('____///')}
    ${b('\\\\\\\\\\\\|///////')}
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
