const path = require('path');
const program = require('commander');
const packageJson = require('./package.json');
const log = require('./utils/log');

// @todo Can we have emojis? How does `yarn` handle it?
log.info('Welcome to the Bolt CLI ⚡️  Have fun!');

// global `bolt` cli options & meta
program
  .version(packageJson.version)
  .option('-C, --config-file <path>', 'Pass in a specific config file instead of default of ".boltrc.js/json".')
  .option('-v, --verbosity <amount>', 'How much output do you want? 0-5', parseInt);

// @todo Come up with default `config` & `options` and ways to easily get them
// an idea for that
// process.env.BOLT_VERBOSITY = program.verbosity;

// defaults to `.boltrc` so either `.boltrc.js` or `.boltrc.json` works
const configFilePath = path.resolve(process.cwd(), program.configFile || '.boltrc');
const config = require(configFilePath);

// `bolt build`
program
  .command('build')
  .description('Build it')
  .option('-W, --watch', 'Watch and rebuild')
  .option('-P, --parallel', 'Run build in parallel instead of a series. Faster, but some assets might not be ready in time.')
  .action((options) => {
    log.info(`Starting build (${options.parallel ? 'parallel' : 'serial'})`);
    if (options.verbosity > 4) {
      log.info('CLI Options');
      console.log(options);
    }

    const build = require('./commands/build');
    build(config, {
      watch: options.watch,
      verbosity: program.verbosity,
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
if (program.verbosity > 4) {
  log.info('All that got `require()`-ed');
  console.log(Object.keys(require.cache).filter(x => !x.includes('node_modules')));
  log.info('END: All that got `require()`-ed');
}

// cli init ~ must go at bottom
program.parse(process.argv);
