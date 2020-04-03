import {
  isConnected,
  render,
  renderString,
  stopServer,
  html,
} from '../../../testing/testing-helpers';
import schema from '../link.schema';
const { display, valign } = schema.properties;

const timeout = 90000;

describe('link', () => {
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
    const renderedLinkHTML = await page.evaluate(async () => {
      document.body.insertAdjacentHTML(
        'beforeend',
        '<div><bolt-link url="http://pega.com" no-shadow>This is a link</bolt-link></div>',
      );
      const link = document.querySelector('bolt-link');
      const undefinedElements = document.querySelectorAll('bolt-link');
      const promises = [...undefinedElements].map(elem =>
        customElements.whenDefined(elem.localName),
      );
      await Promise.all(promises);
      return link.parentNode.outerHTML;
    });
    expect(renderedLinkHTML).toMatchSnapshot();

    const renderedHTML = await html(renderedLinkHTML);

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
    const defaultLinkShadowRoot = await page.evaluate(async () => {
      document.body.insertAdjacentHTML(
        'beforeend',
        '<bolt-link url="http://pega.com">Link Test -- Shadow Root HTML</bolt-link>',
      );
      const link = document.querySelector('bolt-link');
      const undefinedElements = document.querySelectorAll('bolt-link');
      const promises = [...undefinedElements].map(elem =>
        customElements.whenDefined(elem.localName),
      );
      await Promise.all(promises);
      return link.renderRoot.innerHTML;
    });
    expect(defaultLinkShadowRoot).toMatchSnapshot();

    const defaultLinkOuter = await page.evaluate(async () => {
      const link = document.createElement('bolt-link');
      link.setAttribute('url', 'http://pega.com');
      link.textContent = 'Link Test -- Outer HTML';
      document.body.appendChild(link);
      const undefinedElements = document.querySelectorAll('bolt-link');
      const promises = [...undefinedElements].map(elem =>
        customElements.whenDefined(elem.localName),
      );
      await Promise.all(promises);
      return link.outerHTML;
    });
    expect(defaultLinkOuter).toMatchSnapshot();

    const renderedHTML = await html(defaultLinkOuter);
    expect(renderedHTML.textContent).toEqual('Link Test -- Outer HTML');

    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot({
      failureThreshold: '0.01',
      failureThresholdType: 'percent',
    });
  });

  test('Default <bolt-link> w/o Shadow DOM renders and without url prop', async function() {
    const renderedLinkHTML = await page.evaluate(async () => {
      document.body.insertAdjacentHTML(
        'beforeend',
        '<div><bolt-link no-shadow>This is a link without url prop' +
          '</bolt-link></div>',
      );
      const link = document.querySelector('bolt-link');
      const undefinedElements = document.querySelectorAll('bolt-link');
      const promises = [...undefinedElements].map(elem =>
        customElements.whenDefined(elem.localName),
      );
      await Promise.all(promises);
      return link.parentNode.outerHTML;
    });
    expect(renderedLinkHTML).toMatchSnapshot();

    const renderedHTML = await html(renderedLinkHTML);

    expect(renderedHTML.hasAttribute('href')).toBe(false);
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

  test('Default <bolt-link> with Shadow DOM renders and without url prop', async function() {
    const defaultLinkShadowRoot = await page.evaluate(async () => {
      document.body.insertAdjacentHTML(
        'beforeend',
        '<bolt-link>Link Test without url prop -- Shadow Root HTML</bolt-link>',
      );
      const link = document.querySelector('bolt-link');
      const undefinedElements = document.querySelectorAll('bolt-link');
      const promises = [...undefinedElements].map(elem =>
        customElements.whenDefined(elem.localName),
      );
      await Promise.all(promises);
      return link.renderRoot.innerHTML;
    });
    expect(defaultLinkShadowRoot).toMatchSnapshot();

    const defaultLinkOuter = await page.evaluate(async () => {
      const link = document.createElement('bolt-link');
      link.textContent = 'Link Test without url attr -- Outer HTML';
      document.body.appendChild(link);
      const undefinedElements = document.querySelectorAll('bolt-link');
      const promises = [...undefinedElements].map(elem =>
        customElements.whenDefined(elem.localName),
      );
      await Promise.all(promises);
      return link.outerHTML;
    });
    expect(defaultLinkOuter).toMatchSnapshot();

    const renderedHTML = await html(defaultLinkOuter);
    expect(renderedHTML.hasAttribute('href')).toBe(false);
    expect(renderedHTML.textContent).toEqual(
      'Link Test without url attr -- Outer HTML',
    );

    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot({
      failureThreshold: '0.01',
      failureThresholdType: 'percent',
    });
  });

  test('Default <bolt-link> with Shadow DOM renders with no extra whitespace', async function() {
    const defaultLinkOuter = await page.evaluate(async () => {
      // Include huge inline font-size style to increase visibility of any unexpected whitespace
      document.body.insertAdjacentHTML(
        'beforeend',
        '<div style="font-size: 300%;">(<bolt-link url="http://pega.com">Link Test -- No extra whitespace</bolt-link>)</div>',
      );
      const link = document.querySelector('bolt-link').parentNode;
      const undefinedElements = document.querySelectorAll('bolt-link');
      const promises = [...undefinedElements].map(elem =>
        customElements.whenDefined(elem.localName),
      );
      await Promise.all(promises);
      return link.outerHTML;
    });
    expect(defaultLinkOuter).toMatchSnapshot();

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

  test('<bolt-link> does not have duplicate IDs', async () => {
    // The reported bug was only a problem when rendering the initial link with
    // twig, so start by rendering the link with twig.
    const template = await renderString(`
      {% include "@bolt-components-link/link.twig" with {
        text: "Test link -- Has id attribute",
        url: "https://pega.com",
        attributes: {
          id: 'my-link'
         }
        } only %}
    `);

    // Next, convert to a javascript node and disable shadow dom so we can evaluate it with js.
    const renderedLinkHTML = await page.evaluate(async html => {
      const div = document.createElement('div');
      document.body.insertAdjacentHTML('beforeend', html);
      const link = document.querySelector('bolt-link');
      const undefinedElements = document.querySelectorAll('bolt-link');
      const promises = [...undefinedElements].map(elem =>
        customElements.whenDefined(elem.localName),
      );
      await Promise.all(promises);
      return link.outerHTML;
    }, template.html);

    const renderedHTML = await html('<div></div>');
    renderedHTML.innerHTML = renderedLinkHTML;

    // Loop though all elements with any ID to see if there are duplicates.
    // todo: `querySelectorAll('#my-id')` does not return multiple elements when there are dupes. It does in Chrome. See if upgrading basichtml from "0.22.1" to "1.1.1" adds that feature.
    const elemsWithAnyId = renderedHTML.querySelectorAll('[id]');
    let allIds = [];
    let dupIds = [];
    elemsWithAnyId.forEach(el => {
      if (el.id) {
        if (allIds.includes(el.id)) {
          dupIds.push(el.id);
        } else {
          allIds.push(el.id);
        }
      }
    });

    expect(dupIds.length).toEqual(0);
  });
});
