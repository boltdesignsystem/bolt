import {
  isConnected,
  render,
  renderString,
  stopServer,
  html,
  vrtDefaultConfig,
} from '../../../testing/testing-helpers';
import schema from '../<%= props.name.kebabCase %>.schema';
const { disabled } = schema.properties;
const timeout = 90000;

describe('<%= props.name.titleCase %>', () => {
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
      '@bolt-components-<%= props.name.kebabCase %>/<%= props.name.kebabCase %>.twig',
    );
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('adds class via Drupal Attributes', async () => {
    const results = await render(
      '@bolt-components-<%= props.name.kebabCase %>/<%= props.name.kebabCase %>.twig',
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
        '<bolt-<%= props.name.kebabCase %>><%= props.name.titleCase %> test</bolt-<%= props.name.kebabCase %>>',
      );
      const el = document.querySelector('bolt-<%= props.name.kebabCase %>');
      await el.updateComplete;
      return el.renderRoot.innerHTML;
    });

    const outerHTML = await page.evaluate(async () => {
      const el = document.querySelector('bolt-<%= props.name.kebabCase %>');
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
        '<bolt-<%= props.name.kebabCase %> no-shadow><%= props.name.titleCase %> test</bolt-<%= props.name.kebabCase %>>',
      );
      const el = document.querySelector('bolt-<%= props.name.kebabCase %>');
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
      '@bolt-components-<%= props.name.kebabCase %>/<%= props.name.kebabCase %>.twig',
      {
        disabled: true,
      },
    );
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });
});
