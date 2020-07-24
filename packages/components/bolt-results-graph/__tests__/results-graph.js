import {
  isConnected,
  render,
  renderString,
  stopServer,
  html,
  vrtDefaultConfig,
} from '../../../testing/testing-helpers';
import schema from '../results-graph.schema';
const { disabled } = schema.properties;
const timeout = 90000;

describe('Results Graph', () => {
  let page;

  afterAll(async () => {
    await stopServer();
    await page.close();
  });

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

  test('basic usage', async () => {
    const results = await render(
      '@bolt-components-results-graph/results-graph.twig',
    );
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('adds class via Drupal Attributes', async () => {
    const results = await render(
      '@bolt-components-results-graph/results-graph.twig',
      {
        attributes: {
          class: ['u-bolt-margin-top-medium'],
        },
      },
    );
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('renders with Shadow DOM', async function() {
    const shadowRoot = await page.evaluate(async () => {
      document.body.insertAdjacentHTML(
        'beforeend',
        '<bolt-results-graph>Results Graph test</bolt-results-graph>',
      );
      const el = document.querySelector('bolt-results-graph');
      await el.updateComplete;
      return el.renderRoot.innerHTML;
    });

    const outerHTML = await page.evaluate(async () => {
      const el = document.querySelector('bolt-results-graph');
      await el.updateComplete;
      return el.outerHTML;
    });

    const renderedShadowDomHTML = await html(shadowRoot);
    expect(renderedShadowDomHTML).toMatchSnapshot();

    const renderedHTML = await html(outerHTML);
    expect(renderedHTML).toMatchSnapshot();

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot(vrtDefaultConfig);
  });

  test('renders without Shadow DOM', async function() {
    const outerHTML = await page.evaluate(async () => {
      document.body.insertAdjacentHTML(
        'beforeend',
        '<bolt-results-graph no-shadow>Results Graph test</bolt-results-graph>',
      );
      const el = document.querySelector('bolt-results-graph');
      await el.updateComplete;
      return el.outerHTML;
    });

    const renderedHTML = await html(outerHTML);
    expect(renderedHTML).toMatchSnapshot();

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot(vrtDefaultConfig);
  });

  test(`sets 'disabled' prop`, async () => {
    const results = await render(
      '@bolt-components-results-graph/results-graph.twig',
      {
        disabled: true,
      },
    );
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });
});
