import {
  render,
  renderString,
  stop as stopTwigRenderer,
} from '@bolt/twig-renderer';
import { fixture as html } from '@open-wc/testing-helpers';

const { readYamlFileSync } = require('@bolt/build-tools/utils/yaml');
const { join } = require('path');
const schema = readYamlFileSync(join(__dirname, '../modal.schema.yml'));
const { persistent, width, spacing, theme, scroll } = schema.properties;

async function renderTwig(template, data) {
  return await render(template, data, true);
}

async function renderTwigString(template, data) {
  return await renderString(template, data, true);
}

const timeout = 60000;

describe('<bolt-modal> Component', () => {
  let page;

  beforeEach(async () => {
    page = await global.__BROWSER__.newPage();
    await page.goto('http://127.0.0.1:4444/', {
      timeout: 0,
      waitLoad: true,
      waitNetworkIdle: true, // defaults to false
    });
  }, timeout);

  afterAll(async () => {
    await stopTwigRenderer();
  }, timeout);

  test('basic usage', async () => {
    const results = await renderTwig('@bolt-components-modal/modal.twig', {
      content: 'This is a modal',
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  width.enum.forEach(async widthChoice => {
    test(`modal width: ${widthChoice}`, async () => {
      const results = await renderTwig('@bolt-components-modal/modal.twig', {
        width: widthChoice,
        content: 'This is a modal',
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  spacing.enum.forEach(async spacingChoice => {
    test(`modal spacing: ${spacingChoice}`, async () => {
      const results = await renderTwig('@bolt-components-modal/modal.twig', {
        spacing: spacingChoice,
        content: 'This is a modal',
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  theme.enum.forEach(async themeChoice => {
    test(`modal theme: ${themeChoice}`, async () => {
      const results = await renderTwig('@bolt-components-modal/modal.twig', {
        theme: themeChoice,
        content: 'This is a modal',
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  scroll.enum.forEach(async scrollChoice => {
    test(`modal scroll: ${scrollChoice}`, async () => {
      const results = await renderTwig('@bolt-components-modal/modal.twig', {
        scroll: scrollChoice,
        content: 'This is a modal',
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  test('Default <bolt-modal> with Shadow DOM renders', async function() {
    const renderedModal = await page.evaluate(async () => {
      const modal = document.createElement('bolt-modal');
      modal.setAttribute('uuid', '12345');
      modal.innerHTML = `<bolt-text slot="header">This is the header</bolt-text>
      <bolt-text>This is the body (default).</bolt-text>
      <bolt-text slot="footer">This is the footer</bolt-text>`;
      document.body.appendChild(modal);
      modal.show();
      return modal.outerHTML;
    });

    // const activeTagName = await page.evaluate(async () => {
    //   return document.activeElement.tagName;
    // });

    const renderedHTML = await html(renderedModal);

    const image = await page.screenshot();

    // @todo: Fix this, returns 'BOLT-MODAL', expected 'BOLT-BUTTON'.
    // console.log(activeTagName);
    // expect(renderedModal.activeTagName === 'BOLT-BUTTON').toBe(true);

    expect(image).toMatchImageSnapshot({
      failureThreshold: '0.01',
      failureThresholdType: 'percent',
    });

    expect(renderedHTML).toMatchSnapshot();
  });

  test('Default <bolt-modal> w/o Shadow DOM renders', async function() {
    const renderedModal = await page.evaluate(() => {
      const modal = document.createElement('bolt-modal');
      modal.setAttribute('uuid', '12345');
      modal.innerHTML = `<bolt-text slot="header">This is the header</bolt-text>
      <bolt-text>This is the body (default).</bolt-text>
      <bolt-text slot="footer">This is the footer</bolt-text>`;
      document.body.appendChild(modal);
      modal.useShadow = false;
      modal.updated();
      modal.show();
      return modal.outerHTML;
    });

    const renderedHTML = await html(renderedModal);

    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot({
      failureThreshold: '0.01',
      failureThresholdType: 'percent',
    });

    expect(renderedHTML).toMatchSnapshot();
  });
});
