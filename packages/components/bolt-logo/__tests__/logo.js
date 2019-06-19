import {
  isConnected,
  render,
  renderString,
  stopServer,
  html,
} from '../../../testing/testing-helpers';

const timeout = 90000;

describe('logo', () => {
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
    const results = await render('@bolt-components-logo/logo.twig', {
      src: '/fixtures/logo-paypal.svg',
      lazyload: false,
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('Logo with invert set to "true" renders properly', async () => {
    const results = await render('@bolt-components-logo/logo.twig', {
      src: '/fixtures/logo-paypal.svg',
      lazyload: false,
      invert: true,
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('Default <bolt-logo> renders', async function() {
    const renderedLogoHTML = await page.evaluate(() => {
      const logo = document.createElement('bolt-logo');

      // TODO: Use the actual logo web component once converted
      logo.innerHTML = `<bolt-image src="/fixtures/logo-paypal.svg" alt="Paypal Logo" ratio="124/33"></bolt-image>`;

      document.body.appendChild(logo);

      return logo.outerHTML;
    });

    const renderedHTML = await html(renderedLogoHTML);
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot({
      failureThreshold: '0.01',
      failureThresholdType: 'percent',
    });

    expect(renderedHTML).toMatchSnapshot();
  });

  test('Inverted <bolt-logo> renders as inverted', async function() {
    const renderedLogoHTML = await page.evaluate(() => {
      const logo = document.createElement('bolt-logo');
      const wrapper = document.createElement('div');

      // TODO: Use the actual logo web component once converted
      logo.innerHTML = `<bolt-image src="/fixtures/logo-paypal.svg" alt="Paypal Logo" ratio="124/33"></bolt-image>`;
      logo.classList.add('c-bolt-logo--invert');

      wrapper.classList.add('t-bolt-dark');
      wrapper.appendChild(logo);

      document.body.appendChild(wrapper);

      return logo.outerHTML;
    });

    const renderedHTML = await html(renderedLogoHTML);
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot({
      failureThreshold: '0.01',
      failureThresholdType: 'percent',
    });

    expect(renderedHTML).toMatchSnapshot();
  });
});
