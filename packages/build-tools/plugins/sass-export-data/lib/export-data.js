const fs = require('fs-extra');
const path = require('path');
const jsondiff = require('jsondiffpatch');
const getValue = require('./get-value');

module.exports = (config) => {
  function exportData(file, value) {
    const filename = path.join(config.path, file.getValue());
    const output = getValue(value);

    // Write to disk. Fat-arrow because we simply want the parent scope vars
    const write = () => {
      fs.ensureDir(path.dirname(filename), (err) => {
        if (err) throw err;
        fs.writeFile(
          filename,
          JSON.stringify(output, null, '  '),
          (writeerr) => {
            if (writeerr) throw writeerr;
            // console.log(`${filename} saved.`);
          },
        );
      });
    };

    // It is recommended to fs.readFile() and handle error if not exists instead of fs.exists
    fs.readFile(filename, 'utf8', (readerr, existingdata) => {
      // If the file does not exist just write file
      if (readerr && readerr.code === 'ENOENT') {
        write();
      }
      // If there already exists data in the target file
      if (existingdata) {
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
    });

    return value;
  }
  return exportData;
};
