module.exports = {
  verbose: true,
  sauce: false,
  suites: ['test/suites/*'],
  plugins: {
    sauce: { disabled: true },
    local: {
      remote: false,
      browsers: ['chrome', 'firefox']
    }
    // browserstack: {
    //   username: 'salemghoweri5',
    //   accessKey: 'Gq4tSmzPy99rJzAVcWBk',
    //   browsers: [{
    //     browser: 'chrome',
    //     browser_version: 'latest',
    //     os: 'windows',
    //     os_version: '10'
    //   }],
    //   defaults: {
    //     project: 'bolt',
    //     video: false
    //   }
    // }
  }
};
