module.exports = {
  'Bolt Site: verify that the docs site off-canvas nav opens and closes on smaller screens.': function(
    browser,
  ) {
    const { testingUrl } = browser.globals;
    console.log(`global browser url: ${testingUrl}`);
    browser
      .resizeWindow(600, 800)
      .url(`${testingUrl}/docs`)
      .waitForElementVisible('.c-bds-hamburger__button--open', 3000)
      .click('.c-bds-hamburger__button--open')
      .pause(1000)
      .getCssProperty('.c-bds-layout__sidebar', 'transform', function(result) {
        browser.assert.ok(
          result.value === 'matrix(1, 0, 0, 1, 0, 0)',
          `verified that the off-canvas nav should have animated onto the page.`,
        );
      })
      .assert.visible('.c-bds-hamburger__button--close')
      .assert.urlContains('#nav')
      .click('.c-bds-hamburger__button--close')
      .pause(1000)
      .getCssProperty('.c-bds-layout__sidebar', 'transform', function(result) {
        browser.assert.ok(
          result.value === 'matrix(1, 0, 0, 1, -320, 0)',
          `verified that the off-canvas nav should have animated off of the page.`,
        );
      })
      .assert.not.urlContains('#nav')
      .assert.urlContains('#')
      .assert.not.visible('.c-bds-hamburger__button--close')
      .end();
  },
};
