const fs = require('fs-extra');
const path = require('path');
const jsondiff = require('jsondiffpatch');
const getValue = require('./get-value');
const { RawObjectData } = require('@bolt/build-utils/data-store/data-cache/types');

module.exports = config => {
  function exportDataSync(file, value) {
    if (config.dataStore) {
      config.dataStore.set(file.getValue(), new RawObjectData(getValue(value)));
      return value;
    }

    const filename = path.join(config.path, file.getValue());
    const output = getValue(value);

    // Write to disk. Fat-arrow because we simply want the parent scope vars
    const write = () => {
      fs.ensureDirSync(path.dirname(filename));
      fs.writeFileSync(filename, JSON.stringify(output, null, '  '));
      // console.log(`${filename} saved.`);
    };

    // It is recommended to fs.readFile() and handle error if not exists instead of fs.exists
    let existingdata;

    try {
      existingdata = fs.readFileSync(filename, 'utf8');
    } catch (readerr) {
      // If the file does not exist just write file
      if (readerr && readerr.code === 'ENOENT') {
        write();
      }
    }

    if (!existingdata) {
      write();
    } else {
      // Convert existing string to object, and then compare
      const existingObject = JSON.parse(existingdata);
      // If there is no difference, then simply return and do not write file
      if (!jsondiff.diff(existingObject, output)) {
        return value;
      }
      // Otherwise write out the new, unique-values file
      write();
    }

    return value;
  }

  return exportDataSync;
};
