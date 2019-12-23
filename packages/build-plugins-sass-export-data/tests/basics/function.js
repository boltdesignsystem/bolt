const path = require('path');
const sassExportData = require('../../index');

module.exports = sassExportData({
  path: path.join(__dirname, 'dest/sub'),
});
