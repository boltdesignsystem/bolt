const chalk = require('chalk');
const log = require('./log');
const { Validator } = require('jsonschema');

function validateSchema(schema, data) {
  const v = new Validator();
  const results = v.validate(data, schema);
  // console.log(results);
  if (results.errors.length) {
    log.error(chalk.bold('Config Schema Errors:'));
    results.errors.forEach((error, i) => {
      log.error(`${i + 1}) ${error}`);
    });
    log.info('Please fix the config being used in Bolt CLI.');
    process.exit(1);
  } else {
    // log.success('No config schema errors.');
  }
}

module.exports = {
  validateSchema,
};
