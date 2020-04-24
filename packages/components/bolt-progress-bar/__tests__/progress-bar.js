import {
  isConnected,
  render,
  renderString,
  stopServer,
  html,
  vrtDefaultConfig,
} from '../../../testing/testing-helpers';
import schema from '../progress-bar.schema';
const { valueFormat, animated } = schema.properties;
const timeout = 90000;

describe('<progress-bar> component', () => {
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
      '@bolt-components-progress-bar/progress-bar.twig',
      {
        value: 65,
      },
    );
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('0 percent', async () => {
    const results = await render(
      '@bolt-components-progress-bar/progress-bar.twig',
      {
        value: 0,
      },
    );
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('100 percent', async () => {
    const results = await render(
      '@bolt-components-progress-bar/progress-bar.twig',
      {
        value: 100,
      },
    );
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('adds class via Drupal Attributes', async () => {
    const results = await render(
      '@bolt-components-progress-bar/progress-bar.twig',
      {
        value: 65,
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
        '<bolt-progress-bar value=65></bolt-progress-bar>',
      );
      const el = document.querySelector('bolt-progress-bar');
      await el.updateComplete;
      return el.renderRoot.innerHTML;
    });

    const outerHTML = await page.evaluate(async () => {
      const el = document.querySelector('bolt-progress-bar');
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
        '<bolt-progress-bar value=65 no-shadow></bolt-progress-bar>',
      );
      const el = document.querySelector('bolt-progress-bar');
      await el.updateComplete;
      return el.outerHTML;
    });

    const renderedHTML = await html(outerHTML);
    expect(renderedHTML).toMatchSnapshot();

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot(vrtDefaultConfig);
  });

  // Props
  valueFormat.enum.forEach(async option => {
    test(`value format prop: ${option}`, async () => {
      const results = await render(
        '@bolt-components-progress-bar/progress-bar.twig',
        {
          value: 65,
          valueFormat: option,
        },
      );
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  test('max prop: 12', async () => {
    const results = await render(
      '@bolt-components-progress-bar/progress-bar.twig',
      {
        value: 7,
        valueFormat: 'step',
        max: 12,
      },
    );
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('animated prop: true', async () => {
    const results = await render(
      '@bolt-components-progress-bar/progress-bar.twig',
      {
        value: 65,
        animated: true,
      },
    );
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });
});
