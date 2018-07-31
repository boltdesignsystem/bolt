/**
 * Ready script, fires after pages have loaded, but before screenshots are captured.
 *
 * This script is used to hide or modify highly dynamic elements that may cause trouble
 * during visual regression testing.  If you are constantly seeing trivial failures for
 * an element, you can probably deal with it here.
 */
module.exports = async function(page, scenario, vp) {
  await page.addStyleTag({
    content:
      '' +
      // Force all animation to complete immediately.
      '*, *::before, *::after {\n' +
      '  animation-delay: 0ms !important;\n' +
      '  animation-duration: 0ms !important;\n' +
      '  transition-duration: 0ms !important;\n' +
      '  transition-delay: 0ms !important;\n' +
      '}',
    // // Kill Video embeds (show black box instead)
    // '.fluid-width-video-wrapper:after {' +
    // '  background: black;' +
    // "  content: '';" +
    // '  position: absolute;' +
    // '  top: 0;' +
    // '  left: 0;' +
    // '  right: 0;' +
    // '  bottom: 0;' +
    // '  z-index: 100;' +
    // '}' +
    // Kill google Maps (show a green box instead)
    // '.js-google-map {' +
    // '  position: relative;' +
    // '}' +
    // '.js-google-map:before {' +
    // '  background: #B2DEA2;\n' +
    // "  content: ' ';\n" +
    // '  display: block;\n' +
    // '  position: absolute;\n' +
    // '  top: 0;\n' +
    // '  left: 0;\n' +
    // '  right: 0;\n' +
    // '  bottom: 0;\n' +
    // '  z-index: 100;\n' +
    // '}',
  });

  // await page.evaluate(async function() {
  //   // Disable jQuery animation for any future calls.
  //   // jQuery.fx.off = true;
  //   // Immediately complete any in-progress animations.
  //   // jQuery(':animated').finish();
  // });

  // Finally, wait for ajax to complete - this is to give alerts
  // time to finish rendering. This can take a while, especially
  // in local environments.
  // await page.waitForFunction('jQuery.active == 0');

  // Add a slight delay.  This covers up some of the jitter caused
  // by weird network conditions, slow javascript, lazy loaded images, etc.
  await page.waitFor(1500);
};
