const chalk = require('chalk');
const { Validator } = require('jsonschema');
const log = require('./log');
const schemaSchema = require('./schemaSchema-v4');

function validateSchema(schema, data, errorMsg) {
  const v = new Validator();
  const results = v.validate(data, schema);
  // console.log(results);
  if (results.errors.length) {
    log.error(chalk.bold('Config Schema Errors:'));
    results.errors.forEach((error, i) => {
      log.warning(`${i + 1}) ${error}`);
    });
    log.errorAndExit(errorMsg);
  } else {
    // log.success('No config schema errors.');
  }
}

/**
 * Validates JSON Schemas itself against the JSON Schema Schema (so meta)
 * @param {object} schema
 * @param {string} errorMessage
 */
function validateSchemaSchema(schema, errorMessage) {
  validateSchema(schemaSchema, schema, errorMessage);
}

module.exports = {
  validateSchema,
  validateSchemaSchema,
};
