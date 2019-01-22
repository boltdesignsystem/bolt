module.exports = {
  'Pattern Lab: Confirm Successful Now.sh Deploy + Pattern Lab Compiled': function(
    browser,
  ) {
    const { testingUrl } = browser.globals;
    console.log(`global browser url: ${testingUrl}`);
    browser
      .url(`${testingUrl}/pattern-lab/index.html`)
      .waitForElementVisible('.pl-c-body', 1000)
      .verify.title('Pattern Lab - components-overview')
      .end();
  },
};
