import { render } from '@bolt/twig-renderer';
import { fixture as html } from '@open-wc/testing-helpers';

const timeout = 90000;

describe('logo', () => {
  let page;

  beforeEach(async () => {
    page = await global.__BROWSER__.newPage();
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

      // TODO: Use actual image web component once those changes are merged in
      logo.innerHTML = `<bolt-image>
                          <bolt-ratio ratio="124/33">
                            <img class="c-bolt-image__image"
                              srcset="/fixtures/logo-paypal.svg"
                              sizes="auto"
                              src="/fixtures/logo-paypal.svg">
                          </bolt-ratio>
                        </bolt-image>`;

      document.body.appendChild(logo);

      return logo.outerHTML;
    });

    // const renderedHTML = await html(renderedLogoHTML);
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot({
      failureThreshold: '0.01',
      failureThresholdType: 'percent',
    });

    // TODO: match snapshot once image is converted to web component, HTML is hardcoded here
    // expect(renderedHTML).toMatchSnapshot();
  });

  test('Inverted <bolt-logo> renders as inverted', async function() {
    const renderedLogoHTML = await page.evaluate(() => {
      const logo = document.createElement('bolt-logo');
      const wrapper = document.createElement('div');

      // TODO: Use actual image web component once those changes are merged in
      logo.innerHTML = `<bolt-image>
                          <bolt-ratio ratio="124/33">
                            <img class="c-bolt-image__image"
                              srcset="/fixtures/logo-paypal.svg"
                              sizes="auto"
                              src="/fixtures/logo-paypal.svg">
                          </bolt-ratio>
                        </bolt-image>`;

      logo.classList.add('c-bolt-logo--invert');

      wrapper.classList.add('t-bolt-dark');
      wrapper.appendChild(logo);

      document.body.appendChild(wrapper);

      return logo.outerHTML;
    });

    // const renderedHTML = await html(renderedLogoHTML);
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot({
      failureThreshold: '0.01',
      failureThresholdType: 'percent',
    });

    // TODO: match snapshot once image is converted to web component, HTML is hardcoded here
    // expect(renderedHTML).toMatchSnapshot();
  });
});
