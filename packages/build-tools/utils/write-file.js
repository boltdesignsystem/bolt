// async write file, but with async/await support

const fs = require('fs');

const writeFile = (path, data, opts = 'utf8') =>
  new Promise((res, rej) => {
    fs.writeFile(path, data, opts, err => {
      if (err) rej(err);
      else res();
    });
  });

module.exports = {
  writeFile,
};
