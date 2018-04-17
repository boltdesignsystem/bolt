// tests/e2e/pattern-lab-compiling.js

const sauce = require('../../scripts/nightwatch-sauce');

module.exports = {
  beforeEach: browser => {
    browser.url('http://localhost:3000/pattern-lab/patterns/02-components/index.html')
      .waitForElementVisible('body')
      .waitForElementVisible('.sg-main');
  },
  'Smoke test': browser => {
    browser
      .assert.visible('body .sg-main', 'Check if Pattern Lab has compiled successfully via Twig')
      .assert.title('Bolt Design System');
  },
  after: browser => browser.end(),
  tearDown: sauce,
};