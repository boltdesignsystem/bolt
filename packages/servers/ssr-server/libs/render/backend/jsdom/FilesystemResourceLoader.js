const fs = require('fs');
const jsdom = require('jsdom');
const path = require('path');

class FilesystemResourceLoader extends jsdom.ResourceLoader {

  constructor(config) {
    super()
    this.basePath = path.relative(process.cwd(), config.wwwDir)
  }

  fetch(url, options) {
    const absPath = path.resolve(this.basePath, url.replace(/^\/+/, ''))
    return new Promise((accept, reject) => {
      fs.readFile(absPath, (err, data) => {
        if (err) {
          reject(err)
        }
        else {
          accept(data)
        }
      })
    });
  }

}

module.exports = {
  FilesystemResourceLoader,
}
