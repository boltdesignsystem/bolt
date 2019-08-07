const Eyes = require('@applitools/eyes-images').Eyes;
const ConsoleLogHandler = require('@applitools/eyes-common').ConsoleLogHandler;
const url = require('url');
const fs = require('fs');
const path = require('path');

class Applitools {
  constructor() {
    this.eyes = new Eyes();
    this.eyes.setApiKey(process.env.BOLT_APPLITOOLS_API_KEY);
    this.eyes.setLogHandler(new ConsoleLogHandler(false));
    this.screenshotDir = 'screenshots';
    this.vrtTest = this.vrtTest.bind(this);
  }

  /**
   * @param {Object} opt
   * @param {Object} opt.browser - browser Webdriver object provided from Nightwatch.js
   * @param {string} opt.testingPath - path to page that you want to screenshot
   * @param {string} opt.testName - name of the test
   * @returns {Promise<void>}
   */
  async vrtTest({ browser, testName, testingPath }) {
    if (!browser || !browser.globals || !browser.capabilities) {
      console.error(
        'Error with Applitools VRT, improper browser object, check your nightwatch test',
      );
      return;
    }
    const { testingUrl } = browser.globals;
    const currentBrowser = browser.capabilities && browser.capabilities.browserName || 'Unknown Browser';
    const hostOs = browser.capabilities.platform || 'Mac OS X';
    const screenshotPath = path.resolve(
      process.cwd(),
      this.screenshotDir,
      testName,
      `${testName}--${currentBrowser}.png`,
    );

    // Use Nightwatch/Selenium driver to visit site and take screenshot
    // @todo this process currently writes a file to the browserstack instance then reads that file, streaming this directly to Applitools would improve performance
    browser
      .url(url.resolve(testingUrl, testingPath))
      .pause(1500)
      .saveScreenshot(screenshotPath, async () => {
        // Read screenshot from file system
        let screenshot;
        try {
          screenshot = fs.readFileSync(screenshotPath);
        } catch (e) {
          console.error(`screenshot at ${screenshotPath} file read error:`, e);
          return;
        }

        // Load screenshot to Applitools
        // https://applitools.com/docs/api/eyes-sdk/classes-gen/class_eyes/method-eyes-open-selenium-javascript.html
        this.eyes.setHostOS(hostOs);
        this.eyes.setHostApp(currentBrowser);
        this.eyes.setBatch(
          process.env.TRAVIS_JOB_ID
            ? 'Bolt Testing Batch - Travis'
            : 'Bolt Testing Batch - Local',
          browser.globals.applitoolsBatchId,
          0,
        ); // https://applitools.com/docs/topics/working-with-test-batches/batching-tests-in-a-distributed-environment.html
        await this.eyes.open('image comparison', testName);
        await this.eyes.checkImage(screenshot, testName);
        try {
          await this.eyes.close(false);
        } catch (err) {
          console.error('An error occurs during runtime', err);
          this.eyes.abortIfNotClosed();
        }
      });

    browser.end();
  }
}

module.exports = new Applitools();
