---
title: JavaScript testing standards
---

> The one imperfect test is better than no test at all.

## Main Benefits 

- Consistent approach to writing tests
- Best practices can be passed by examples
- Consistent formatting

## Best practices

- test files should be added to `__tests__` folder in component root directory
- naming of the test file should look like `component-name.js`
- use `fixture` folder for images, icons or any additional resources needed for testing
- use `testing-helpers` functions located in `packages/testing/testing-helpers/index.js`
- use component schema to test schema props
- create tests for all know use cases
- after fixing a bug, create test to prevent that to happen once again

## What type of test we have

1. JEST
    - Unit test
    - Smoke test
    - Integration test
    - VRT test
    - Cross browser test
1. NIGHTWATCH
    - E2E test
    - Cross browser test
    - Functionality test
    
## How to run tests

All commands must be launched from root folder of the Bolt 

1. All tests
    - `yarn test`
1. All Jest tests
    - `yarn test:js`
1. Specific Jest test
    - `npx jest 'path-to-test-file'`
    - example: `npx jest packages/components/bolt-button/__tests__/button.js`
1. E2E full/quick tests live site
    - full: `yarn test:e2e:full-live`
    - quick: `yarn test:e2e:quick-live`
1. E2E full/quick tests local
    - full: `yarn test:e2e:full-local`
    - quick: `yarn test:e2e:quick-local`
1. E2E full/quick tests master branch
    - full: `yarn test:e2e:full-master`
    - quick: `yarn test:e2e:quick-master`
1. E2E specific test localy
    - `NOW_URL='url-for-test' ./node_modules/.bin/nightwatch --config 'path-to-config' --env 'brwosers-list' --test 'path-to-e2e-test-file'` 
    - example: `NOW_URL=http://localhost:3000 ./node_modules/.bin/nightwatch --config packages/testing/testing-nightwatch/nightwatch.local.js --env chrome,safari --test packages/components/bolt-accordion/__tests__/accordion.e2e.js`

*Note: To run E2E local test you should watch bolt files by launching: `yarn start`.\
Note 2: Monorepo test will fail when you earlier not compile bolt at least one time.*

## JEST test

### How to create basic test
```javascript
test('Basic usage', async () => {
  const results = await render('@bolt-components-button/button.twig', {
    text: 'This is a button',
  });
  expect(results.ok).toBe(true);
  expect(results.html).toMatchSnapshot();
});
```

### How to create schema prop test
```javascript
const { tag } = schema.properties;
 
tag.enum.forEach(async tagChoice => {
  test(`Button tag: ${tagChoice}`, async () => {
    const results = await render('@bolt-components-button/button.twig', {
      text: 'This is a button',
      tag: tagChoice,
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });
});
```

### How to create boolean prop test
```javascript
test('Button with "disabled" adds attr to <a>', async () => {
  const results = await render('@bolt-components-button/button.twig', {
    text: 'This is a button',
    url: 'http://pega.com',
    disabled: true,
  });
  expect(results.ok).toBe(true);
  expect(results.html).toMatchSnapshot();
});
```

### How to create nested components / string rendering test
```javascript
test('<bolt-ol>with nested <bolt-ul> list', async () => {
  const results = await renderString(`
    {% include '@bolt-components-ol/ol.twig' with {
      items: [
        'Do not include any data or information in your posts that are confidential!',
        'Apply basic practices for collaborative work.',
        'Be honest, respectful, trustworthy and helpful.',
        'Answer questions authoritatively and concisely. Avoid cluttering discussions with noise.',
        [
          'Answer questions authoritatively and concisely.',
          include('@bolt-components-ul/ul.twig', {
            items: [
              'Item 1',
              'Item 2',
              'Item 3',
              'Item 4'
            ]
          })
        ]
      ]
    } %}
  `);
  expect(results.ok).toBe(true);
  expect(results.html).toMatchSnapshot();
});
```

### How to create breakpoint/viewport test
```javascript
const viewportSizes = [
  {
    size: 'xlarge',
    width: 1920,
    height: 1080,
  },
  {
    size: 'large',
    width: 1024,
    height: 768,
  },
  {
    size: 'medium',
    width: 896,
    height: 414,
  },
  {
    size: 'small',
    width: 320,
    height: 568,
  },
];
 
 
test(
  '<bolt-navbar> with 6 lengthy links',
  async () => {
    const { html, ok } = await render('@bolt-components-navbar/navbar.twig', {
      title: {
        tag: 'h2',
        text: 'Navbar with links',
        icon: {
          name: 'marketing-gray',
        },
      },
      links: [
        {
          text: 'Real-Time AI',
          url: '#!',
        },
        {
          text: 'End-to-end Automation',
          url: '#!',
        },
        {
          text: 'Journey-centric Delivery',
          url: '#!',
        },
        {
          text: 'Low Code',
          url: '#!',
        },
        {
          text: 'Multi-dimensional Power',
          url: '#!',
        },
        {
          text: 'Cloud Choice',
          url: '#!',
        },
      ],
    });
    expect(ok).toBe(true);
    expect(html).toMatchSnapshot();
 
    await page.evaluate(html => {
      const div = document.createElement('div');
      div.innerHTML = `${html}`;
      document.body.appendChild(div);
    }, html);
 
    const screenshots = [];
 
    async function isVisible(selector) {
      return await page.evaluate(selector => {
        const e = document.querySelector(selector);
        if (!e) return false;
        const style = window.getComputedStyle(e);
        return style &&
          style.display !== 'none' &&
          style.visibility !== 'hidden' &&
          style.opacity !== '0'
          ? true
          : false;
      }, selector);
    }
 
    for (const item of viewportSizes) {
      const { height, width, size } = item;
      screenshots[size] = [];
 
      await page.setViewport({ height, width });
      screenshots[size].default = await page.screenshot();
      expect(screenshots[size].default).toMatchImageSnapshot(imageVrtConfig);
 
      if (await isVisible('.c-bolt-nav-priority__show-more')) {
        await page.tap('.c-bolt-nav-priority__button');
        await page.waitFor(500);
        screenshots[size].navOpened = await page.screenshot();
        expect(screenshots[size].navOpened).toMatchImageSnapshot(
          imageVrtConfig,
        );
        await page.tap('.c-bolt-nav-priority__button');
        await page.waitFor(500);
      }
    }
  },
  timeout,
);
```

### How to create external resources test
```javascript
test('<bolt-image> with ratio object compiles', async () => {
  const results = await render('@bolt-components-image/image.twig', {
    src: '/fixtures/1200x660.jpg',
    alt: 'A Rock Climber',
    lazyload: true,
  });
  expect(results.ok).toBe(true);
  expect(results.html).toMatchSnapshot();
});
```
*Note: Fixtures folder must be present in the `__tests__` folder in specific component*

### How to create w/o Shadow DOM test
```javascript
const buttonNoShadowHTML = `
  <bolt-button no-shadow>
    This is a button
  </bolt-button>
`;
 
 
test('Default <bolt-button> w/o Shadow DOM renders', async function() {
  const buttonOuterHTML = await page.evaluate(async buttonNoShadowHTML => {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = buttonNoShadowHTML;
    document.body.appendChild(wrapper);
 
    const button = document.querySelector('bolt-button');
    const allElements = [button];
 
    return await Promise.all(
      allElements.map(element => {
        if (element._wasInitiallyRendered) return;
        return new Promise((resolve, reject) => {
          element.addEventListener('ready', resolve);
          element.addEventListener('error', reject);
        });
      }),
    ).then(() => {
      return button.outerHTML;
    });
  }, buttonNoShadowHTML);
 
  const buttonRenderedHTML = await html(buttonOuterHTML);
  expect(buttonRenderedHTML).toMatchSnapshot();
});
```

### How to create with Shadow DOM test
```javascript
const buttonNoShadowHTML = `
  <bolt-button no-shadow>
    This is a button
  </bolt-button>
`;
 
 
const buttonHTML = `
  <bolt-button>
    Button Test -- Shadow Root HTML
  </bolt-button>
`;
 
 
test('Default <bolt-button> with Shadow DOM renders', async function() {
  const buttonShadowRoot = await page.evaluate(async buttonHTML => {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = buttonHTML;
    document.body.appendChild(wrapper);
 
    const button = document.querySelector('bolt-button');
    const allElements = [button];
 
    return await Promise.all(
      allElements.map(element => {
        if (element._wasInitiallyRendered) return;
        return new Promise((resolve, reject) => {
          element.addEventListener('ready', resolve);
          element.addEventListener('error', reject);
        });
      }),
    ).then(() => {
      return button.renderRoot.innerHTML;
    });
  }, buttonHTML);
 
  const renderedShadowRoot = await html(`<div>${buttonShadowRoot}</div>`);
 
  expect(renderedShadowRoot.innerHTML).toMatchSnapshot();
 
  await page.waitFor(500);
  const image = await page.screenshot();
 
  expect(image).toMatchImageSnapshot({
    failureThreshold: '0.01',
    failureThresholdType: 'percent',
  });
});
```

## Nightwatch test
Nightwatch tests are not reusable and must be written for specific use case. Documentation how to use and create Nightwatch test is [here](https://nightwatchjs.org/guide).

### How to check if component contain specific class
```javascript
'Bolt Image zoom': function(browser) {
  const { testingUrl } = browser.globals;
  console.log(`global browser url: ${testingUrl}`);
  currentBrowser = '--' + browser.currentEnv || 'chrome';
  let testName = 'bolt-image-zoom';
 
  browser
    .url(
      `${testingUrl}/pattern-lab/patterns/02-components-image-30-image-zoom-variation/02-components-image-30-image-zoom-variation.html`,
    )
    .waitForElementVisible('.c-bolt-image-zoom__overlay-icon', 1000)
    .saveScreenshot(
      `screenshots/bolt-image/${testName}--${currentBrowser}.png`,
    )
    .end();
}
```

### How to check if image component renders with specific ratio and is rendered by "_wasInitiallyRendered" property
```javascript
'Bolt Image image is showed': function(browser) {
  const { testingUrl } = browser.globals;
  console.log(`global browser url: ${testingUrl}`);
  currentBrowser = '--' + browser.currentEnv || 'chrome';
  let testName = 'bolt-image-showed';
  let bodyWidth = 0;
 
  browser
    .url(
      `${testingUrl}/pattern-lab/patterns/02-components-image-05-image/02-components-image-05-image.html`,
    )
    .waitForElementVisible('body', 1000)
    .getElementSize('body', function(result) {
      bodyWidth = result.value.width;
    })
    .getElementSize('bolt-image', function(result) {
      const imageHeight = Math.round(bodyWidth / 1.3333333333);
 
      this.assert.equal(result.value.width, bodyWidth);
      this.assert.equal(result.value.height, imageHeight);
    })
    .execute(
      function(data) {
        return document.querySelector('bolt-image')._wasInitiallyRendered;
      },
      [],
      function(result) {
        browser.assert.ok(
          result.value === true,
          `verified the <bolt-image> was rendered via the "_wasInitiallyRendered" property.`,
        );
      },
    )
    .saveScreenshot(
      `screenshots/bolt-image/${testName}--${currentBrowser}.png`,
    )
    .end();
}
```

### How to check if component exist, have specific class and contain some text
```javascript
'Bolt Blockquote': function(browser) {
  const { testingUrl } = browser.globals;
  console.log(`global browser url: ${testingUrl}`);
  currentBrowser = '--' + browser.currentEnv || 'chrome';
  let testName = 'bolt-blockquote';
 
  browser
    .url(
      `${testingUrl}/pattern-lab/patterns/02-components-blockquote-10-blockquote-alignItems-variation/02-components-blockquote-10-blockquote-alignItems-variation.html`,
    )
    .waitForElementVisible('bolt-blockquote', 1000)
    .assert.elementPresent('bolt-logo[slot="logo"]')
    .execute(
      function(data) {
        const blockquote = document.querySelector('bolt-blockquote');
        return blockquote.renderRoot
          .querySelector('blockquote')
          .classList.contains('c-bolt-blockquote');
      },
      [],
      function(result) {
        browser.assert.ok(
          result.value === true,
          `verified that <bolt-blockquote> rendered the blockquote element with a class of  c-bolt-blockquote.`,
        );
      },
    )
    .assert.containsText(
      'bolt-blockquote cite[slot="author-name"]',
      'Michelangelo di Lodovico Buonarroti Simoni',
    )
    .saveScreenshot(
      `screenshots/bolt-blockquote/${testName}--${currentBrowser}.png`,
    )
    .end();
}
```

### How to check playback rate
```javascript
'Bolt Video Playback Rate': function(browser) {
  const { testingUrl } = browser.globals;
  console.log(`global browser url: ${testingUrl}`);
  currentBrowser = '--' + browser.currentEnv || 'chrome';
  let testName = 'bolt-video-playback-rate';
 
  browser
    .url(
      `${testingUrl}/pattern-lab/patterns/02-components-video-35-video-with-inline-script-and-external-controls/02-components-video-35-video-with-inline-script-and-external-controls.html`,
    )
    .waitForElementVisible('.video-js', 1000)
    .click('.vjs-big-play-button')
    .assert.elementPresent('.vjs-playback-rate')
    .execute(function(data) {
      return document.querySelector('button.vjs-playback-rate').click();
    })
    .saveScreenshot(
      `screenshots/bolt-video/${testName}--${currentBrowser}.png`,
    )
    .execute(
      function(data) {
        return document.querySelector('bolt-video').player.playbackRate();
      },
      [],
      function(result) {
        browser.assert.ok(
          result.value === 1.25,
          `verified that <bolt-video> play rate has sped up to ${result.value}`,
        );
      },
    )
    .execute(
      function(data) {
        return document.querySelector('.vjs-playback-rate-value').textContent;
      },
      [],
      function(result) {
        browser.assert.ok(
          result.value === '1.25x',
          `verified that <bolt-video> play rate text reads 1.25x.`,
        );
      },
    )
    .saveScreenshot(
      `screenshots/bolt-video/${testName}--playback-at-1.25x--${currentBrowser}.png`,
    )
    .end();
}
```
