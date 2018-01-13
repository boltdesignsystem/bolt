const path = require('path');
const program = require('commander');
const packageJson = require('./package.json');
const configStore = require('./utils/config-store');
const log = require('./utils/log');
const chalk = require('chalk');

// @TODO: How best to pull in .scss color data export to reference branch colors below?
const b = chalk.hex('#545DA6'); // indigo, light
const y = chalk.hex('#ffcc4d'); // yellow, base

const CLI_TITLE = chalk.bold.underline('Bolt-CLI');
const CLI_DESCRIPTION = 'Welcome to the Bolt CLI ⚡️  Have fun!';
const CLI_USAGE = 'Usage: \`bolt <command> [options ...]\`';

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
  ${b('\\\\\\     ')}${y('|//')}${b('    ///')}
   ${b('\\\\\\____')}${y('|/')}${b('____///')}
    ${b('\\\\\\\\\\\\|///////')}
`

// @todo Can we have emojis? How does `yarn` handle it?
log.info(HELP_HEADER);

// global `bolt` cli options & meta
program
  .version(packageJson.version)
  .option('-C, --config-file <path>', 'Pass in a specific config file instead of default of ".boltrc.js/json".')
  .option('-v, --verbosity <amount>', 'How much output do you want? 0-5', parseInt);


// defaults to `.boltrc` so either `.boltrc.js` or `.boltrc.json` works
const configFilePath = path.resolve(process.cwd(), program.configFile || '.boltrc');
configStore.init(require(configFilePath));

// `bolt build`
program
  .command('build')
  .description('Build it')
  .option('-W, --watch', 'Watch and rebuild')
  .option('-P, --parallel', 'Run build in parallel instead of a series. Faster, but some assets might not be ready in time.')
  .action((options) => {
    log.info(`Starting build (${options.parallel ? 'parallel' : 'serial'})`);

    configStore.updateConfig((config) => {
      config.verbosity = typeof program.verbosity === 'undefined'
        ? config.verbosity
        : program.verbosity;
      return config;
    });

    const build = require('./commands/build');
    build({
      watch: options.watch,
      parallel: options.parallel,
    });
  });

// `bolt lint`
program
  .command('lint')
  .description('A linter... that doesn\'t work!')
  .action(() => {
    log.taskStart('lint');
    console.log('Im linting... ');
    console.log('Looks good to me 👍');
    log.taskDone('lint');
  });

// This will tell you all that got `require()`-ed
// We want to only load what we need - that's why not all `require` statements are at top
// log.info('All that got `require()`-ed');
// console.log(Object.keys(require.cache).filter(x => !x.includes('node_modules')));
// log.info('END: All that got `require()`-ed');

// cli init ~ must go at bottom
program.parse(process.argv);
