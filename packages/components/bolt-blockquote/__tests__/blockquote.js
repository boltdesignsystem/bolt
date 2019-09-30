import {
  isConnected,
  render,
  renderString,
  stopServer,
  html,
  vrtDefaultConfig as vrtConfig,
} from '../../../testing/testing-helpers';
const { readYamlFileSync } = require('@bolt/build-tools/utils/yaml');
const { join } = require('path');
const schema = readYamlFileSync(join(__dirname, '../blockquote.schema.yml'));
const { tag } = schema.properties;

const vrtDefaultConfig = Object.assign(vrtConfig, {
  failureThreshold: '0.02',
});

const timeout = 90000;

describe('button', () => {
  let page;

  afterAll(async () => {
    await stopServer();
    await page.close();
  }, 100);

  beforeEach(async () => {
    await page.evaluate(() => {
      document.body.innerHTML = '';
    });
  }, timeout);

  beforeAll(async () => {
    page = await global.__BROWSER__.newPage();
    await page.goto('http://127.0.0.1:4444/', {
      timeout: 0,
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
      blockquote.setAttribute('author-name', 'Chris Heilmann');
      blockquote.setAttribute('author-title', 'Developer Evangelist');
      blockquote.innerHTML = `
        <p>Java is to JavaScript what Car is to Carpet.</p>
      `;
      document.body.appendChild(blockquote);
      document.body.classList.add('u-bolt-padding-medium');
      blockquote.updated();
      return blockquote.outerHTML;
    });

    await page.evaluate(async () => {
      const selectors = Array.from(
        document.querySelectorAll('bolt-blockquote'),
      );
      return await Promise.all(
        selectors.map(blockquote => {
          if (blockquote._wasInitiallyRendered === true) return;
          return new Promise((resolve, reject) => {
            blockquote.addEventListener('ready', resolve);
            blockquote.addEventListener('error', reject);
          });
        }),
      );
    });

    const renderedHTML = await html(defaultBlockquoteOuter);

    await page.waitFor(500);
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot(vrtDefaultConfig);

    expect(renderedHTML).toMatchSnapshot();
  });

  test('Default <bolt-blockquote> w/o Shadow DOM renders', async function() {
    const renderedBlockquoteHTML = await page.evaluate(() => {
      const blockquote = document.createElement('bolt-blockquote');
      blockquote.setAttribute(
        'author-name',
        'Michelangelo di Lodovico Buonarroti Simoni',
      );
      blockquote.setAttribute('align-items', 'center');
      blockquote.setAttribute('author-title', 'Renaissance Artist');
      blockquote.setAttribute('author-image', '/fixtures/500x500.jpg');
      blockquote.innerHTML = `<img slot="logo" src="/fixtures/paypal-logo.svg" alt="PayPal Logo">
        <p>Bolt Blockquote w/ Shadow DOM Manually Disabled</p>
        <p>Press any key to continue or any other key to quit.</p>
      `;
      document.body.appendChild(blockquote);
      document.body.classList.add('u-bolt-padding-medium');
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

    await page.evaluate(async () => {
      const selectors = Array.from(
        document.querySelectorAll('bolt-blockquote'),
      );
      return await Promise.all(
        selectors.map(blockquote => {
          if (blockquote._wasInitiallyRendered === true) return;
          return new Promise((resolve, reject) => {
            blockquote.addEventListener('ready', resolve);
            blockquote.addEventListener('error', reject);
          });
        }),
      );
    });

    await page.waitFor(500);
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot(vrtDefaultConfig);

    expect(renderedHTML).toMatchSnapshot();
  });

  test('Default <bolt-blockquote> inside a <form> renders', async function() {
    const renderedBlockquoteHTML = await page.evaluate(() => {
      const form = document.createElement('form');
      const blockquote = document.createElement('bolt-blockquote');
      blockquote.setAttribute('author-name', 'Every Developer, Ever.');
      blockquote.setAttribute('border', 'horizontal');
      blockquote.setAttribute('size', 'xxlarge');
      blockquote.setAttribute('author-title', 'Web Developer');
      blockquote.innerHTML = `
        <img slot="logo" src="/fixtures/bolt-logo.svg" alt="Bolt Design System Logo" style="max-width: 200px">
        <p>Bolt Blockquote w/ Shadow DOM auto-disabled</p>
        <p>Yeah, but it works on my machine...</p>
      `;
      document.body.appendChild(form);
      document.body.classList.add('u-bolt-padding-medium');
      form.appendChild(blockquote);
      blockquote.updated();
      return blockquote.innerHTML;
    });

    await page.evaluate(async () => {
      const selectors = Array.from(
        document.querySelectorAll('bolt-blockquote'),
      );
      return await Promise.all(
        selectors.map(blockquote => {
          if (blockquote._wasInitiallyRendered === true) return;
          return new Promise((resolve, reject) => {
            blockquote.addEventListener('ready', resolve);
            blockquote.addEventListener('error', reject);
          });
        }),
      );
    });

    const renderedHTML = await html(renderedBlockquoteHTML);
    await page.waitFor(500);
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot(vrtDefaultConfig);

    expect(renderedHTML).toMatchSnapshot();
  });

  test('<bolt-blockquote> with No Quotes renders', async function() {
    const defaultBlockquoteOuter = await page.evaluate(() => {
      const blockquote = document.createElement('bolt-blockquote');
      blockquote.setAttribute(
        'author-name',
        'Michelangelo di Lodovico Buonarroti Simoni',
      );
      blockquote.setAttribute('author-title', 'Renaissance Artist');
      blockquote.setAttribute('no-quotes', '');
      blockquote.innerHTML = `
        <p>The greater danger for most of us lies not in setting our aim too high and falling short...</p>
        <p>In fact, the greater danger is setting our aim too low and achieving our mark.</p>`;
      document.body.appendChild(blockquote);
      blockquote.updated();
      return blockquote.outerHTML;
    });

    const renderedHTML = await html(defaultBlockquoteOuter);

    await page.waitFor(500); // wait half a second before running VRTs
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot(vrtDefaultConfig);

    expect(renderedHTML).toMatchSnapshot();
  });
});
