const { template } = require('./template')
const { FilesystemResourceLoader } = require('./FilesystemResourceLoader')
const { JsDomRenderBackend } = require('./JsDomRenderBackend')

module.exports = {
  JsDomRenderBackend,
  FilesystemResourceLoader,
  template,
}
