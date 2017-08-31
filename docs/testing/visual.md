---
title: Visual regression testing
label: Visual regression
---

We test our components in order to catch visual regressions before they hit the production. We use [WebdriverIO](http://webdriver.io/) to drive those tests on [Sauce Labs](https://saucelabs.com/)'s Selenium cloud-based solution:

Here are the results of the latest build:

[![Build Status](https://saucelabs.com/browser-matrix/europa-component-library.svg)](https://saucelabs.com/u/europa-component-library)

## How to test a new component

Testing a new component is quite simple. Follow the guide!

### Write a test

Tests are located under `test/functional`. Create a new `my-component.js` file here and paste:

```js
describe('my-component', () => {
  before(() => {
    // Set viewport size
    browser.setViewportSize({
      width: 1400,
      height: 600,
    });

    browser.pause(1000);

    // Go to url
    browser.url('my-component.html');

    // Make sure the browser has finished painting
    browser.pause(1000);
  });

  // Normal state
  context('with plain state', () => {
    it('should match the reference screenshot', () => {
      const screenshots = browser.checkDocument({
        name: 'my-component',
      });
      expect(screenshots).to.matchReference();
    });
  });
});
```

Of course, replace `my-component` by the name of the actual component and make sure the URL you provide exists.

**Under the hood, the URL will be prefixed by `http://localhost:3000/components/preview/`**.

### Get the reference screenshots

In order to get the reference screenshots, you have to run the tests locally. On the first run, if the reference screenshots don't exist, they will be created. You need to create a Sauce Labs account and then create a new token.

#### Configure Sauce Labs

In your `.env` file, provide the information about your own Sauce Labs account.

```
SAUCE_USERNAME=username
SAUCE_ACCESS_KEY=my-sauce-labs-access-key
```

Then, build the style guide with `yarn dist` and run: `yarn test:functional`.

Tip: it can take a while to run all the tests, but you can also target your test only:

```
yarn test:functional -- --spec ./test/functional/my-component.js
```

If everything went well, you should now have a new folder `./test/screenshots/reference/my-component` containing the reference screenshots. Add them to your Pull Request.

That's it!
