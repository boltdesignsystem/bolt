const fs = require('fs');
const path = require('path');

function walkDir(dir) {
  var files = fs.readdirSync(dir);
  var filelist = [];

  files.forEach(function(file) {
    var absfile = path.join(dir, file);
    if (fs.statSync(absfile).isDirectory()) {
      // var theseFiles = walkDir(absfile).map(subfile => path.join(file, subfile))
      filelist = filelist.concat(walkDir(absfile));
    } else {
      filelist.push(absfile);
    }
  });

  return filelist;
}

module.exports = walkDir;
