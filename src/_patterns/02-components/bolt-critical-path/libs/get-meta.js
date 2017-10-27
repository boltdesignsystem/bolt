/* eslint-disable */
// getMeta function: get a meta tag by name
// NOTE: meta tag must be in the HTML source before this script is included in order to guarantee it'll be found

var Meta = {
  get: function(metaname) {
    var metas = window.document.getElementsByTagName('meta'),
      meta;

    for (var i = 0; i < metas.length; i++) {
      if (metas[i].name && metas[i].name === metaname) {
        meta = metas[i];
        break;
      }
    }
    return meta;
  }
};

module.exports = Meta;