const NodeCache = require('node-cache');
const crypto = require('crypto');
const fs = require('fs');

const BoltCache = new NodeCache();

// given the path to a local file being streamed, returns back the MD5 hash to quickly check if a file's contents have changed.
function getFileHash(filePath, callback) {
  var stream = fs.ReadStream(filePath);
  var md5sum = crypto.createHash('md5');

  stream.on('data', function(data) {
    md5sum.update(data);
  });

  stream.on('end', function() {
    callback(md5sum.digest('hex'));
  });
}

module.exports = {
  BoltCache,
  getFileHash,
};
