const { promisify } = require('util');
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const log = require('./log');
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const { ensureFileExists } = require('./general');

/**
 * Object to Yaml
 * @param {object} object
 * @returns {string} - Yaml
 * @see fromYaml
 */
function toYaml(object) {
  return yaml.safeDump(object);
}

/**
 * Yaml to Object
 * @param {string} string - Yaml
 * @returns {object}
 * @see toYaml
 */
function fromYaml(string) {
  return yaml.safeLoad(string);
}

/**
 * Read Yaml File into Object
 * @param {string} file - File path
 * @returns {Promise<object>} Promise resolves with yaml file as object
 * @see fromYaml
 * @see writeYamlFile
 */
function readYamlFile(file) {
  return new Promise((resolve, reject) => {
    readFile(file, 'utf8')
      .then(data => resolve(fromYaml(data)))
      .catch(reject);
  });
}

/**
 * Read Yaml File into Object
 * @param {string} file - File path
 * @returns {object} Yaml file as object
 * @see fromYaml
 * @see writeYamlFile
 */
function readYamlFileSync(file) {
  return fromYaml(fs.readFileSync(file, 'utf8'));
  // return new Promise((resolve, reject) => {
  //   readFile(file, 'utf8')
  //     .then(data => resolve(fromYaml(data)))
  //     .catch(reject);
  // });
}

/**
 * Write Yaml string to File
 * @param {string} file - File path
 * @param {object} data - Object to turn into Yaml
 * @returns {Promise}
 * @see readYamlFile
 * @see toYaml
 */
function writeYamlFile(file, data) {
  return new Promise((resolve, reject) => {
    writeFile(file, toYaml(data))
      .then(resolve)
      .catch(reject);
  });
}

/**
 * Read a JSON/Yaml/JS data file
 * @param {string} filePath
 * @returns {Promise<object>} - data from file
 */
async function getDataFile(filePath) {
  ensureFileExists(filePath);
  const fileInfo = path.parse(filePath);
  try {
    switch (fileInfo.ext) {
      case '.json':
        const fileContents = await readFile(filePath, 'utf8');
        return JSON.parse(fileContents);
        break;
      case '.yml':
      case '.yaml':
        return await readYamlFile(filePath);
        break;
      case '.js':
        return require(filePath);
        break;
    }
  } catch (err) {
    log.errorAndExit('Could not getDataFile', err);
  }
}

module.exports = {
  fromYaml,
  toYaml,
  readYamlFile,
  readYamlFileSync,
  writeYamlFile,
  getDataFile,
};
