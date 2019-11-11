const fs = require('fs-extra');
const glob = require('glob');
const path = require('path');
const DataCache = require('./data-cache');
const defaults = require('./defaults');
const { TextFileData } = require('./data-cache/types');

function getModule() {
  if (!module.exports.promises) {
    module.exports.promises = [];
  }
  return module.exports;
}

async function set(file, value) {
  const module = getModule();
  const promise = module.cache.set(file, value);
  module.promises.push(promise);
  await promise;
  return await module.cache.get(file);
}

function get(file) {
  const module = getModule();
  return module.cache.get(file);
}

async function readFile(file, absPath) {
  const module = getModule();
  const filePath = absPath || path.resolve(module.basePath, file);

  const isFile = await new Promise((resolve, reject) => {
    fs.stat(filePath, (err, stats) => {
      if (err) {
        reject(err);
      }
      resolve(stats.isFile());
    });
  });

  if (isFile) {
    return await set(file, new TextFileData(absPath));
  }
  else {
    return await module.cache.get(file);
  }
}

async function writeFile(file, absPath) {
  const module = getModule();
  const data = get(file);
  const filePath = absPath || path.resolve(module.exportPath, file);
  fs.ensureDirSync(path.dirname(filePath));
  fs.writeFileSync(filePath, JSON.stringify(data.value, null, '  '));
}

async function flush() {
  const module = getModule();
  const promises = [];
  await Promise.all(module.promises);
  module.cache.forEach((value, key) => {
    promises.push(writeFile(key));
  });
  await Promise.all(promises);
}

async function initialize(opts) {
  module.exports.dataDirs = opts.dataDirs = opts.dataDirs || defaults.dataDirs;
  module.exports.basePath = opts.basePath = opts.basePath || defaults.basePath,
  module.exports.exportPath = opts.exportPath = opts.exportPath || defaults.exportPath,
  module.exports.merger = opts.merger = opts.merger || defaults.merger,
  module.exports.cache = opts.cache = new DataCache(opts.merger);

  for (let nextDataDir of opts.dataDirs) {
    nextDataDir = path.resolve(opts.basePath, nextDataDir);

    await new Promise(resolve => {
      glob(`${nextDataDir}/**/*`, (er, files) => {
        const filePromises = []; 

        files.forEach(file => {
          file = file.replace(`${nextDataDir}/`, '');
          filePromises.push(readFile(file, path.resolve(nextDataDir, file)));
        });

        Promise.all(filePromises).then(resolve);
      });
    });
  };

  return module.exports;
}

module.exports = {
  initialize,
  set,
  get,
  fs: {
    readFile,
    writeFile,
    flush,
  },
};
