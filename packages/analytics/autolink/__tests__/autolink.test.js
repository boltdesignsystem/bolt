import { renderWC } from '../../../testing/testing-helpers';
const path = require('path');

const timeout = 90000;

describe('analytics autolinker', () => {
  let page;

  beforeEach(async () => {
    page = await global.__BROWSER__.newPage();
    await page.goto('http://127.0.0.1:4444/', {
      waitUntil: 'networkidle0',
      timeout: 0,
    });

    await page.addScriptTag({
      url: 'https://www.google-analytics.com/analytics.js',
    });
  }, timeout);

  afterEach(async () => {
    await page.close();
  });

  test('autolinker does not modify component URLs already containing an _ga query string', async function() {
    await page.addScriptTag({
      type: 'module',
      path: path.join(__dirname, 'fixtures/test-analytics-config.data.js'),
    });

    await renderWC(
      'bolt-button',
      `<bolt-button url="https://www.google.com/?_ga=1234">External URL w/ existing GA Tracking</bolt-button>`,
      page,
    );

    await page.click('bolt-button');
    const currentUrl = await page.url();

    expect(currentUrl).toContain('_ga=1234');
  }, 120000);

  test('autolinker updates the URLs of a <bolt-button> with an external url (2nd in the config) + rendering to the Shadow DOM', async function() {
    await page.addScriptTag({
      type: 'module',
      path: path.join(__dirname, 'fixtures/test-analytics-config.data.js'),
    });

    await page.evaluate(() => {
      const btn = document.createElement('bolt-button');
      btn.textContent = 'External URL - Shadow DOM Test';
      btn.setAttribute('url', 'https://www.brightcove.com');
      document.body.appendChild(btn);
    });

    await page.click('bolt-button');
    const currentUrl = await page.url();

    expect(currentUrl).toContain('_ga');
  }, 120000);

  test('autolinker tracks the URLs of a <bolt-button> with an external url (2nd in the config) + rendering to the Shadow DOM - even after re-rendering', async function() {
    await page.addScriptTag({
      type: 'module',
      path: path.join(__dirname, 'fixtures/test-analytics-config.data.js'),
    });

    await renderWC(
      'bolt-button',
      `<bolt-button url="https://developer.mozilla.org">External URL - Shadow DOM Test</bolt-button>`,
      page,
    );

    await page.evaluate(() => {
      const btn = document.querySelector('bolt-button');
      btn.setAttribute('url', 'https://www.brightcove.com');
      btn.setAttribute('color', 'secondary');
      return document.body.innerHTML;
    });

    await page.click('bolt-button');
    const currentUrl = await page.url();

    expect(currentUrl).toContain('_ga');
    expect(currentUrl).toContain('brightcove.com');
  }, 5000);

  test('autolinker updates the URLs of a <bolt-button> with an external url + rendering to the Shadow DOM', async function() {
    await page.addScriptTag({
      type: 'module',
      path: path.join(__dirname, 'fixtures/test-analytics-config.data.js'),
    });

    await renderWC(
      'bolt-button',
      `<bolt-button url="https://www.google.com">External URL - Shadow DOM Test</bolt-button>`,
      page,
    );

    await page.click('bolt-button');
    const currentUrl = await page.url();

    expect(currentUrl).toContain('_ga');
  }, 120000);

  test('autolinker updates the URLs of <bolt-button>s with external urls + render to the light DOM', async function() {
    await page.addScriptTag({
      type: 'module',
      path: path.join(__dirname, 'fixtures/test-analytics-config.data.js'),
    });

    await renderWC(
      'bolt-button',
      `<bolt-button url="https://www.google.com" no-shadow>External URL - Light DOM Test</bolt-button>`,
      page,
    );

    const navigationPromise = page.waitForNavigation();
    await page.click('bolt-button');
    await navigationPromise;
    const currentUrl = await page.url();

    expect(currentUrl).toContain('_ga');
  }, 120000);

  test('autolinker does not track <bolt-button>s with urls not containing domains in the config', async function() {
    await page.addScriptTag({
      type: 'module',
      path: path.join(__dirname, 'fixtures/test-analytics-config.data.js'),
    });

    await renderWC(
      'bolt-button',
      `<bolt-button url="https://developer.mozilla.org">External URL - Untracked Domain</bolt-button>`,
      page,
    );

    await page.click('bolt-button');
    const currentUrl = await page.url();

    expect(currentUrl).not.toContain('_ga');
  }, 120000);

  test('autolinker updates the URLs of a <bolt-link> with an external url + rendering to the Shadow DOM', async function() {
    await page.addScriptTag({
      type: 'module',
      path: path.join(__dirname, 'fixtures/test-analytics-config.data.js'),
    });

    await renderWC(
      'bolt-link',
      `<bolt-link style="display: inline-block;" url="https://www.google.com">External URL - Shadow DOM Test</bolt-link>`,
      page,
    );

    await page.click('bolt-link');
    const currentUrl = await page.url();

    expect(currentUrl).toContain('_ga');
  }, 120000);

  test('autolinker updates the URLs of a <bolt-link> with an external url + rendering to the light DOM', async function() {
    await page.addScriptTag({
      type: 'module',
      path: path.join(__dirname, 'fixtures/test-analytics-config.data.js'),
    });

    await renderWC(
      'bolt-link',
      `<bolt-link no-shadow url="https://www.google.com">External URL - Light DOM Test</bolt-link>`,
      page,
    );

    await page.click('bolt-link');
    const currentUrl = await page.url();

    expect(currentUrl).toContain('_ga');
  }, 120000);

  test('autolinker does not track <bolt-link>s with urls not containing domains in the config', async function() {
    await page.addScriptTag({
      type: 'module',
      path: path.join(__dirname, 'fixtures/test-analytics-config.data.js'),
    });

    await renderWC(
      'bolt-link',
      `<bolt-link style="display: inline-block;" url="https://developer.mozilla.org">External URL - Untracked Domain</bolt-link>`,
      page,
    );

    await page.click('bolt-link');
    const currentUrl = await page.url();

    expect(currentUrl).not.toContain('_ga');
  }, 120000);

  test('the correct inline config for specifying autolink domains inside Drupal exists', async function() {
    await page.addScriptTag({
      type: 'module',
      path: path.join(
        __dirname,
        'fixtures/test-analytics.drupal-config.data.js',
      ),
    });

    await page.waitFor(3000); // wait a few seconds before checking the data we need is available on the page

    const config = await page.evaluate(() => {
      return window.drupalSettings.google_analytics.trackCrossDomains[0];
    });

    expect(config).toBe('developer.mozilla.org');
  }, 120000);

  test('allow Drupal to configure which domains get configured / tracked by autolink.', async function() {
    await page.addScriptTag({
      type: 'module',
      path: path.join(
        __dirname,
        'fixtures/test-analytics.drupal-config.data.js',
      ),
    });

    await renderWC(
      'bolt-button',
      `<bolt-button style="display: inline-block;" url="https://developer.mozilla.org">External URL - Normally Untracked But Now Tracked Domain</bolt-button>`,
      page,
    );

    await page.click('bolt-button');
    const currentUrl = await page.url();

    expect(currentUrl).toContain('_ga');
  }, 120000);
});
