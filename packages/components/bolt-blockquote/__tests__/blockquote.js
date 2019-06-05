import {
  isConnected,
  render,
  renderString,
  stopServer,
  html,
} from '../../../testing/testing-helpers';
const { readYamlFileSync } = require('@bolt/build-tools/utils/yaml');
const { join } = require('path');
const schema = readYamlFileSync(join(__dirname, '../blockquote.schema.yml'));
const { tag } = schema.properties;

const timeout = 90000;

describe('button', () => {
  let page, context;

  afterAll(async () => {
    await stopServer();
  }, 100);

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
  }, timeout);

  test('Basic usage', async () => {
    const results = await render(
      '@bolt-components-blockquote/blockquote.twig',
      {
        author: {
          name: 'Michelangelo di Lodovico Buonarroti Simoni',
          title: 'Renaissance Artist',
        },
        content:
          '<p>The greater danger for most of us lies not in setting our aim too high and falling short; but in setting our aim too low, and achieving our mark.</p>',
      },
      true,
    );
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('Default <bolt-blockquote> with Shadow DOM renders', async function() {
    const defaultBlockquoteOuter = await page.evaluate(() => {
      const blockquote = document.createElement('bolt-blockquote');
      blockquote.setAttribute(
        'author-name',
        'Michelangelo di Lodovico Buonarroti Simoni',
      );
      blockquote.setAttribute('author-title', 'Renaissance Artist');
      blockquote.setAttribute('author-image', '/fixtures/500x500.jpg');
      blockquote.innerHTML = `<img slot="logo" src="/fixtures/logo-paypal.svg" alt="PayPal Logo">
        <p>The greater danger for most of us lies not in setting our aim too high and falling short...</p>
        <p>In fact, the greater danger is setting our aim too low and achieving our mark.</p>`;
      document.body.appendChild(blockquote);
      blockquote.updated();
      return blockquote.outerHTML;
    });

    const renderedHTML = await html(defaultBlockquoteOuter);

    await page.waitFor(500); // wait half a second before running VRTs
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot({
      failureThreshold: '0.03',
      failureThresholdType: 'percent',
    });

    expect(renderedHTML).toMatchSnapshot();
  });

  test('Default <bolt-blockquote> w/o Shadow DOM renders', async function() {
    const renderedBlockquoteHTML = await page.evaluate(() => {
      const blockquote = document.createElement('bolt-blockquote');
      blockquote.setAttribute(
        'author-name',
        'Michelangelo di Lodovico Buonarroti Simoni',
      );
      blockquote.setAttribute('author-title', 'Renaissance Artist');
      blockquote.setAttribute('author-image', '/fixtures/500x500.jpg');
      blockquote.innerHTML = `<img slot="logo" src="/fixtures/logo-paypal.svg" alt="PayPal Logo">
        <p>The greater danger for most of us lies not in setting our aim too high and falling short...</p>
        <p>In fact, the greater danger is setting our aim too low and achieving our mark.</p>`;
      document.body.appendChild(blockquote);
      blockquote.useShadow = false;
      blockquote.updated();
      return blockquote.outerHTML;
    });

    const renderedHTML = await html(renderedBlockquoteHTML);

    expect(
      renderedHTML
        .querySelector('.c-bolt-blockquote')
        .classList.contains('c-bolt-blockquote--xlarge'),
    ).toBe(true);

    await page.waitFor(500); // wait half a second before running VRTs
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot({
      failureThreshold: '0.03',
      failureThresholdType: 'percent',
    });

    expect(renderedHTML).toMatchSnapshot();
  });

  test('Default <bolt-blockquote> inside a <form> renders', async function() {
    const renderedBlockquoteHTML = await page.evaluate(() => {
      const form = document.createElement('form');
      const blockquote = document.createElement('bolt-blockquote');
      blockquote.setAttribute(
        'author-name',
        'Michelangelo di Lodovico Buonarroti Simoni',
      );
      blockquote.setAttribute('author-title', 'Renaissance Artist');
      blockquote.setAttribute('author-image', '/fixtures/500x500.jpg');
      blockquote.innerHTML = `<img slot="logo" src="/fixtures/logo-paypal.svg" alt="PayPal Logo">
        <p>The greater danger for most of us lies not in setting our aim too high and falling short...</p>
        <p>In fact, the greater danger is setting our aim too low and achieving our mark.</p>`;
      document.body.appendChild(form);
      form.appendChild(blockquote);
      blockquote.updated();
      return blockquote.innerHTML;
    });

    const renderedHTML = await html(renderedBlockquoteHTML);
    await page.waitFor(500); // wait half a second before running VRTs
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot({
      failureThreshold: '0.03',
      failureThresholdType: 'percent',
    });

    expect(renderedHTML).toMatchSnapshot();
  });
});
