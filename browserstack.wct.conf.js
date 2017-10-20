const package = require('./package.json');

module.exports = {
  // Directly set active browsers to use
  activeBrowsers: [{
    browserName: 'ie',
    version: '11'
  }, {
    browserName: 'edge'
  }, {
    browserName: 'chrome'
  }, {
    browserName: 'firefox'
  }, {
    browserName: 'safari',
    os: 'OS X',
    os_version: 'Sierra'
  }],
  browserOptions: {
    // Point all browsers to Browserstack's WD api
    url: 'https://hub-cloud.browserstack.com/wd/hub',
    // Name of the test, build, and project. I was using Amazon AWS CodeBuild, use your own CI env build variable
    name: 'WCT',
    build: process.env.CODEBUILD_BUILD_ID || new Date(),
    project: package.name,
    // Browserstack auth
    'browserstack.user': 'salemghoweri5',
    'browserstack.key': 'Gq4tSmzPy99rJzAVcWBk',
    // Use browserstack local tunnel that we started
    'browserstack.local': true
  },
  webserver: {
    pathMappings: [
      {
        '/components/my-element/bower_components': 'bower_components'
      }
    ]
  }
};