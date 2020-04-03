import {
  isConnected,
  render,
  renderString,
  stopServer,
  html,
} from '../../../testing/testing-helpers';

const timeout = 60000;

describe('<bolt-icon> Component', () => {
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
    const results = await render('@bolt-components-icon/icon.twig', {
      name: 'add-open',
      background: 'square',
      size: 'medium',
      color: 'teal',
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('Default <bolt-icon> with Shadow DOM renders', async function() {
    const defaultIconShadowRoot = await page.evaluate(async () => {
      const icon = document.createElement('bolt-icon');
      icon.setAttribute('name', 'add-open');
      icon.setAttribute('background', 'circle');
      icon.setAttribute('size', 'large');
      document.body.appendChild(icon);
      const undefinedElements = document.querySelectorAll('bolt-icon');
      const promises = [...undefinedElements].map(elem =>
        customElements.whenDefined(elem.localName),
      );
      await Promise.all(promises);
      return icon.renderRoot.innerHTML;
    });

    const defaultIconOuter = await page.evaluate(async () => {
      const icon = document.createElement('bolt-icon');
      icon.setAttribute('name', 'add-open');
      icon.setAttribute('background', 'circle');
      icon.setAttribute('size', 'large');
      document.body.appendChild(icon);
      const undefinedElements = document.querySelectorAll('bolt-icon');
      const promises = [...undefinedElements].map(elem =>
        customElements.whenDefined(elem.localName),
      );
      await Promise.all(promises);
      return icon.outerHTML;
    });

    const renderedShadowDomHTML = await html(defaultIconShadowRoot);
    const renderedHTML = await html(defaultIconOuter);

    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot({
      failureThreshold: '0.01',
      failureThresholdType: 'percent',
    });

    expect(renderedShadowDomHTML).toMatchSnapshot();
    expect(renderedHTML).toMatchSnapshot();
  });

  test('Additional <bolt-icon> with Shadow DOM renders', async function() {
    const defaultIconShadowRoot = await page.evaluate(async () => {
      const icon = document.createElement('bolt-icon');
      icon.setAttribute('name', 'yeti');
      icon.setAttribute('background', 'circle');
      icon.setAttribute('size', 'large');
      document.body.appendChild(icon);
      const undefinedElements = document.querySelectorAll('bolt-icon');
      const promises = [...undefinedElements].map(elem =>
        customElements.whenDefined(elem.localName),
      );
      await Promise.all(promises);
      return icon.renderRoot.innerHTML;
    });

    const defaultIconOuter = await page.evaluate(async () => {
      const icon = document.createElement('bolt-icon');
      icon.setAttribute('name', 'yeti');
      icon.setAttribute('background', 'circle');
      icon.setAttribute('size', 'large');
      document.body.appendChild(icon);
      const undefinedElements = document.querySelectorAll('bolt-icon');
      const promises = [...undefinedElements].map(elem =>
        customElements.whenDefined(elem.localName),
      );
      await Promise.all(promises);
      return icon.outerHTML;
    });

    const renderedShadowDomHTML = await html(defaultIconShadowRoot);
    const renderedHTML = await html(defaultIconOuter);

    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot({
      failureThreshold: '0.01',
      failureThresholdType: 'percent',
    });

    expect(renderedShadowDomHTML).toMatchSnapshot();
    expect(renderedHTML).toMatchSnapshot();
  });
});
