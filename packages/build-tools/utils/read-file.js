// async read file, but with async/await support

const fs = require('fs');

const readFile = (path, opts = 'utf8') =>
  new Promise((res, rej) => {
    fs.readFile(path, opts, (err, data) => {
      if (err) rej(err);
      else res(data);
    });
  });

module.exports = {
  readFile,
};
