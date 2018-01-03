const gm = require('gm');
const through = require('through2');
const path = require('path');

function resize(el) {
  return through.obj((originalFile, enc, cb) => {

    const file = originalFile.clone({ contents: false });
    const fileExt = path.extname(file.path);

    // Skip if file is an SVG or GIF -- no need to resize
    if (file.isNull() || fileExt === '.svg' || fileExt === '.gif') {
      return cb(null, file);
    }

    const gmfile = gm(file.contents, file.path);
    gmfile.size((err, size) => {
      if (typeof el !== 'undefined' && el.width < size.width) {
        gmfile
          .resize(el.width, (el.width / size.width) * size.height)
          .toBuffer((err, buffer) => {
            file.contents = buffer;
            cb(null, file);
          });
      } else {
        // remove from stream
        cb(null, null);
      }
    });
  });
}

module.exports.resize = resize;
