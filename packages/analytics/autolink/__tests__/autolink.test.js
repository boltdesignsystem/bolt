const path = require('path');

const timeout = 90000;

describe('analytics autolinker', () => {
  let page, context;

  beforeAll(async () => {
    context = await global.__BROWSER__.createIncognitoBrowserContext();
  });

  beforeEach(async () => {
    page = await context.newPage();
    await page.goto('http://127.0.0.1:4444/', {
      timeout: 0,
      waitLoad: true,
      waitNetworkIdle: true, // defaults to false
    });

    await page.addScriptTag({
      url: 'https://www.google-analytics.com/analytics.js',
    });
  }, timeout);

  test('autolinker does not modify component URLs already containing an _ga query string', async function() {
    await page.addScriptTag({
      type: 'module',
      path: path.join(__dirname, 'fixtures/test-analytics-config.data.js'),
    });

    await page.evaluate(() => {
      const btn = document.createElement('bolt-button');
      btn.textContent = 'External URL w/ existing GA Tracking';
      btn.setAttribute('url', 'https://www.google.com/?_ga=1234');
      document.body.appendChild(btn);
    });

    const navigationPromise = page.waitForNavigation();
    await page.click('bolt-button');
    await navigationPromise;
    const currentUrl = await page.url();

    expect(currentUrl).toContain('_ga=1234');
  }, 60000);

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

    const navigationPromise = page.waitForNavigation();
    await page.click('bolt-button');
    await navigationPromise;
    const currentUrl = await page.url();

    expect(currentUrl).toContain('_ga');
  }, 60000);

  test('autolinker tracks the URLs of a <bolt-button> with an external url (2nd in the config) + rendering to the Shadow DOM - even after re-rendering', async function() {
    await page.addScriptTag({
      type: 'module',
      path: path.join(__dirname, 'fixtures/test-analytics-config.data.js'),
    });

    await page.evaluate(() => {
      const btn = document.createElement('bolt-button');
      btn.textContent = 'External URL - Shadow DOM Test';
      btn.setAttribute('url', 'https://www.pega.com');
      document.body.appendChild(btn);
    });

    await page.evaluate(() => {
      const btn = document.querySelector('bolt-button');
      btn.setAttribute('url', 'https://www.brightcove.com');
      btn.setAttribute('color', 'secondary');
      return document.body.innerHTML;
    });

    const navigationPromise = page.waitForNavigation();
    await page.click('bolt-button');
    await navigationPromise;
    const currentUrl = await page.url();

    expect(currentUrl).toContain('_ga');
    expect(currentUrl).toContain('brightcove.com');
  }, 60000);

  test('autolinker updates the URLs of a <bolt-button> with an external url + rendering to the Shadow DOM', async function() {
    await page.addScriptTag({
      type: 'module',
      path: path.join(__dirname, 'fixtures/test-analytics-config.data.js'),
    });

    await page.evaluate(() => {
      const btn = document.createElement('bolt-button');
      btn.textContent = 'External URL - Shadow DOM Test';
      btn.setAttribute('url', 'https://www.google.com');
      document.body.appendChild(btn);
    });

    const navigationPromise = page.waitForNavigation();
    await page.click('bolt-button');
    await navigationPromise;
    const currentUrl = await page.url();

    expect(currentUrl).toContain('_ga');
  }, 60000);

  test('autolinker updates the URLs of <bolt-button>s with external urls + render to the light DOM', async function() {
    await page.addScriptTag({
      type: 'module',
      path: path.join(__dirname, 'fixtures/test-analytics-config.data.js'),
    });

    await page.evaluate(() => {
      const btn = document.createElement('bolt-button');
      btn.textContent = 'External URL - Light DOM Test';
      btn.useShadow = false;
      btn.setAttribute('url', 'https://www.google.com');
      document.body.appendChild(btn);
    });

    const navigationPromise = page.waitForNavigation();
    await page.click('bolt-button');
    await navigationPromise;
    const currentUrl = await page.url();

    expect(currentUrl).toContain('_ga');
  }, 60000);

  test('autolinker does not track <bolt-button>s with urls not containing domains in the config', async function() {
    await page.addScriptTag({
      type: 'module',
      path: path.join(__dirname, 'fixtures/test-analytics-config.data.js'),
    });

    await page.evaluate(() => {
      const btn = document.createElement('bolt-button');
      btn.textContent = 'External URL - Untracked Domain';
      btn.setAttribute('url', 'https://www.pega.com');
      document.body.appendChild(btn);
    });

    const navigationPromise = page.waitForNavigation();
    await page.click('bolt-button');
    await navigationPromise;
    const currentUrl = await page.url();

    expect(currentUrl).not.toContain('_ga');
  }, 60000);

  test('autolinker updates the URLs of a <bolt-link> with an external url + rendering to the Shadow DOM', async function() {
    await page.addScriptTag({
      type: 'module',
      path: path.join(__dirname, 'fixtures/test-analytics-config.data.js'),
    });

    await page.evaluate(() => {
      const link = document.createElement('bolt-link');
      link.textContent = 'External URL - Shadow DOM Test';
      link.style.display = 'inline-block'; // for some strange reason, without any :host styles or this, puppeteer can't seem to find this DOM node to click on
      link.setAttribute('url', 'https://www.google.com');
      document.body.appendChild(link);
    });

    const navigationPromise = page.waitForNavigation();
    await page.click('bolt-link');
    await navigationPromise;
    const currentUrl = await page.url();

    expect(currentUrl).toContain('_ga');
  }, 60000);

  test('autolinker updates the URLs of a <bolt-link> with an external url + rendering to the light DOM', async function() {
    await page.addScriptTag({
      type: 'module',
      path: path.join(__dirname, 'fixtures/test-analytics-config.data.js'),
    });

    await page.evaluate(() => {
      const link = document.createElement('bolt-link');
      link.textContent = 'External URL - Light DOM Test';
      link.useShadow = false;
      link.setAttribute('url', 'https://www.google.com');
      document.body.appendChild(link);
    });

    const navigationPromise = page.waitForNavigation();
    await page.click('bolt-link');
    await navigationPromise;
    const currentUrl = await page.url();

    expect(currentUrl).toContain('_ga');
  }, 60000);

  test('autolinker does not track <bolt-link>s with urls not containing domains in the config', async function() {
    await page.addScriptTag({
      type: 'module',
      path: path.join(__dirname, 'fixtures/test-analytics-config.data.js'),
    });

    await page.evaluate(() => {
      const link = document.createElement('bolt-link');
      link.textContent = 'External URL - Untracked Domain';
      link.style.display = 'inline-block'; // for some strange reason, without any :host styles or this, puppeteer can't seem to find this DOM node to click on
      link.setAttribute('url', 'https://www.pega.com');
      document.body.appendChild(link);
    });

    const navigationPromise = page.waitForNavigation();
    await page.click('bolt-link');
    await navigationPromise;
    const currentUrl = await page.url();

    expect(currentUrl).not.toContain('_ga');
  }, 60000);

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

    expect(config).toBe('pega.com');
  }, 60000);

  test('allow Drupal to configure which domains get configured / tracked by autolink.', async function() {
    await page.addScriptTag({
      type: 'module',
      path: path.join(
        __dirname,
        'fixtures/test-analytics.drupal-config.data.js',
      ),
    });

    await page.evaluate(() => {
      const btn = document.createElement('bolt-button');
      btn.textContent =
        'External URL - Normally Untracked But Now Tracked Domain';
      btn.setAttribute('url', 'https://www.pega.com');
      document.body.appendChild(btn);
    });

    const navigationPromise = page.waitForNavigation();
    await page.click('bolt-button');
    await navigationPromise;
    const currentUrl = await page.url();

    expect(currentUrl).toContain('_ga');
  }, 60000);
});
