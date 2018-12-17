var toDiffableHtml = require('diffable-html');
var pretty = require('pretty');

module.exports = {
  test(object) {
    return typeof object === 'string' && object.trim()[0] === '<';
  },
  print(val) {
    const preFormattedHTML = pretty(val, { ocd: true }); // pre-format with pretty before making snapshot results more diff-friendly
    return toDiffableHtml(preFormattedHTML);
  },
};
