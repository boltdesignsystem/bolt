import {
  isConnected,
  render,
  renderString,
  stopServer,
  html,
} from '../../../testing/testing-helpers';
const { readYamlFileSync } = require('@bolt/build-tools/utils/yaml');
const { join } = require('path');
const schema = readYamlFileSync(join(__dirname, '../link.schema.yml'));
const { display, valign } = schema.properties;

const timeout = 90000;

describe('link', () => {
  let page, isOnline, context;

  beforeAll(async () => {
    isOnline = await isConnected();
    context = await global.__BROWSER__.createIncognitoBrowserContext();
  });

  afterAll(async () => {
    await stopServer();
  });

  beforeEach(async () => {
    page = await context.newPage();
    await page.goto('http://127.0.0.1:4444/', {
      timeout: 0,
      waitLoad: true,
      waitNetworkIdle: true, // defaults to false
    });
  }, timeout);

  test('basic link', async () => {
    const results = await render('@bolt-components-link/link.twig', {
      text: 'Hello World',
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  display.enum.forEach(async option => {
    test(`link display: ${option}`, async () => {
      const results = await render('@bolt-components-link/link.twig', {
        text: 'Hello World',
        display: option,
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  valign.enum.forEach(async option => {
    test(`link valign: ${option}`, async () => {
      const results = await render('@bolt-components-link/link.twig', {
        text: 'Hello World',
        valign: option,
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  test('Link with outer classes via Drupal Attributes', async () => {
    const results = await render('@bolt-components-link/link.twig', {
      text: 'Link with outer classes',
      attributes: {
        class: ['u-bolt-padding-medium'],
      },
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('Link with inner classes via Drupal Attributes', async () => {
    const results = await render('@bolt-components-link/link.twig', {
      text: 'Link with inner classes',
      attributes: {
        class: ['is-active'],
      },
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('Link with outer JS-class via Drupal Attributes', async () => {
    const results = await render('@bolt-components-link/link.twig', {
      text: 'Link with outer JS-prefixed class',
      attributes: {
        class: ['js-click-me'],
      },
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('Link with c-bolt- class is thrown out', async () => {
    const results = await render('@bolt-components-link/link.twig', {
      text: 'Link with outer JS-prefixed class',
      attributes: {
        class: ['c-bolt-link--secondary'],
      },
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('Link with an onClick param renders properly', async () => {
    const results = await render('@bolt-components-link/link.twig', {
      text: 'Link with onClick via param',
      onClick: 'on-click-test',
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('Link with an onClick attributes renders properly', async () => {
    const results = await render('@bolt-components-link/link.twig', {
      text: 'Link w/ onClick via attributes',
      attributes: {
        'on-click': 'on-click-test',
      },
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('Default <bolt-link> w/o Shadow DOM renders', async function() {
    const renderedLinkHTML = await page.evaluate(() => {
      const link = document.createElement('bolt-link');
      link.textContent = 'This is a link';
      link.setAttribute('url', 'http://pega.com');
      document.body.appendChild(link);
      link.useShadow = false;
      link.updated();
      return link.outerHTML;
    });

    const renderedHTML = await html('<div></div>');
    renderedHTML.innerHTML = renderedLinkHTML;

    expect(
      renderedHTML
        .querySelector('.c-bolt-link')
        .classList.contains('c-bolt-link--display-inline'),
    ).toBe(true);

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot({
      failureThreshold: '0.01',
      failureThresholdType: 'percent',
    });

    expect(renderedHTML).toMatchSnapshot();
  });

  test('Default <bolt-link> with Shadow DOM renders', async function() {
    const defaultLinkShadowRoot = await page.evaluate(() => {
      const link = document.createElement('bolt-link');
      link.textContent = 'Link Test -- Shadow Root HTML';
      link.setAttribute('url', 'http://pega.com');
      document.body.appendChild(link);
      link.updated();
      return link.renderRoot.innerHTML;
    });

    const defaultLinkOuter = await page.evaluate(() => {
      const link = document.createElement('bolt-link');
      link.setAttribute('url', 'http://pega.com');
      link.textContent = 'Link Test -- Outer HTML';
      document.body.appendChild(link);
      link.updated();
      return link.outerHTML;
    });

    const renderedShadowDomHTML = await html(defaultLinkShadowRoot);
    const renderedHTML = await html(defaultLinkOuter);

    expect(renderedHTML.textContent).toEqual('Link Test -- Outer HTML');

    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot({
      failureThreshold: '0.01',
      failureThresholdType: 'percent',
    });

    expect(renderedShadowDomHTML).toMatchSnapshot();
    expect(renderedHTML).toMatchSnapshot();
  });

  test('Default <bolt-link> with Shadow DOM renders with no extra whitespace', async function() {
    const defaultLinkOuter = await page.evaluate(() => {
      const link = document.createElement('bolt-link');
      link.setAttribute('url', 'http://pega.com');
      link.textContent = 'Link Test -- No extra whitespace';

      const linkWrapper = document.createElement('div');
      linkWrapper.innerHTML += '(';
      linkWrapper.append(link);
      linkWrapper.innerHTML += ')';
      document.body.appendChild(linkWrapper);
      link.updated();
      return linkWrapper.outerHTML;
    });

    const renderedHTML = await html(defaultLinkOuter);

    expect(renderedHTML.querySelector('bolt-link').textContent).toEqual(
      'Link Test -- No extra whitespace',
    );

    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot({
      failureThreshold: '0.01',
      failureThresholdType: 'percent',
    });

    expect(renderedHTML).toMatchSnapshot();
  });
});
