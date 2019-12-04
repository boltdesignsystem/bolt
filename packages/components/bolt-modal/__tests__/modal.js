/* eslint-disable no-await-in-loop */
import {
  render,
  stopServer,
  html,
  vrtDefaultConfig as vrtConfig,
} from '../../../testing/testing-helpers';

const { readYamlFileSync } = require('@bolt/build-tools/utils/yaml');
const { join } = require('path');
const schema = readYamlFileSync(join(__dirname, '../modal.schema.yml'));
const { width, spacing, theme, scroll } = schema.properties;

const vrtDefaultConfig = Object.assign(vrtConfig, {
  failureThreshold: '0.02',
});

const timeout = 120000;

// Currently, the only important breakpoints to test are 'small' and 'large'
const viewportSizes = [
  {
    size: 'large',
    width: 1024,
    height: 768,
  },
  {
    size: 'small',
    width: 320,
    height: 568,
  },
];

describe('<bolt-modal> Component', () => {
  let page;

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

  afterAll(async () => {
    await stopServer();
    await page.close();
  }, timeout);

  test('basic usage', async () => {
    const results = await render('@bolt-components-modal/modal.twig', {
      content: 'This is a modal',
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  width.enum.forEach(async widthChoice => {
    test(`modal width: ${widthChoice}`, async () => {
      const results = await render('@bolt-components-modal/modal.twig', {
        width: widthChoice,
        content: 'This is a modal',
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  spacing.enum.forEach(async spacingChoice => {
    test(`modal spacing: ${spacingChoice}`, async () => {
      const results = await render('@bolt-components-modal/modal.twig', {
        spacing: spacingChoice,
        content: 'This is a modal',
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  theme.enum.forEach(async themeChoice => {
    test(`modal theme: ${themeChoice}`, async () => {
      const results = await render('@bolt-components-modal/modal.twig', {
        theme: themeChoice,
        content: 'This is a modal',
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  scroll.enum.forEach(async scrollChoice => {
    test(`modal scroll: ${scrollChoice}`, async () => {
      const results = await render('@bolt-components-modal/modal.twig', {
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
      modal.innerHTML = `<bolt-text tag="h3" slot="header">This is the header</bolt-text>
      <bolt-text>This is the body (default).</bolt-text>
      <bolt-text slot="footer">This is the footer</bolt-text>`;
      document.body.appendChild(modal);
      modal.updated();
      modal.show();
      return modal.outerHTML;
    });

    // const activeTagName = await page.evaluate(async () => {
    //   return document.activeElement.tagName;
    // });

    const renderedHTML = await html(renderedModal);

    await page.waitFor(1000); // wait a second before testing
    const image = await page.screenshot();

    // @todo: Fix this, returns 'BOLT-MODAL', expected 'BOLT-BUTTON'.
    // console.log(activeTagName);
    // expect(renderedModal.activeTagName === 'BOLT-BUTTON').toBe(true);

    expect(image).toMatchImageSnapshot(vrtDefaultConfig);

    expect(renderedHTML).toMatchSnapshot();
  });

  test('Default <bolt-modal> w/o Shadow DOM renders', async function() {
    const renderedModal = await page.evaluate(() => {
      const modal = document.createElement('bolt-modal');
      modal.setAttribute('uuid', '12345');
      modal.innerHTML = `<bolt-text tag="h3" slot="header">This is the header</bolt-text>
      <bolt-text>This is the body (default).</bolt-text>
      <bolt-text slot="footer">This is the footer</bolt-text>`;
      document.body.appendChild(modal);
      modal.useShadow = false;
      modal.updated();
      modal.show();
      return modal.outerHTML;
    });

    const renderedHTML = await html(renderedModal);

    await page.waitFor(1000); // wait a second before testing
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot(vrtDefaultConfig);

    expect(renderedHTML).toMatchSnapshot();
  });

  test(
    '<bolt-modal> rendered by Twig',
    async () => {
      const { html, ok } = await render('@bolt-components-modal/modal.twig', {
        content:
          '<bolt-text tag="h3" slot="header">This is the header</bolt-text><bolt-text>This is the body (default).</bolt-text><bolt-text slot="footer">This is the footer</bolt-text>',
      });
      expect(ok).toBe(true);
      expect(html).toMatchSnapshot();

      await page.evaluate(html => {
        const div = document.createElement('div');
        const trigger = document.createElement('bolt-button');
        trigger.textContent = 'Open Modal';
        trigger.setAttribute('class', 'js-modal-trigger--open');
        trigger.setAttribute('onclick', 'this.nextElementSibling.show()');
        div.innerHTML = `${html}`;
        div.prepend(trigger);
        document.body.appendChild(div);
      }, html);

      const screenshots = [];

      async function isVisible(selector) {
        return await page.evaluate(selector => {
          const e = document.querySelector(selector);
          if (!e) return false;
          const style = window.getComputedStyle(e);
          return style &&
            style.display !== 'none' &&
            style.visibility !== 'hidden' &&
            style.opacity !== '0'
            ? true
            : false;
        }, selector);
      }

      for (const item of viewportSizes) {
        const { height, width, size } = item;
        screenshots[size] = [];

        await page.setViewport({ height, width });
        await page.tap('.js-modal-trigger--open');
        await page.waitFor(500);

        if (await isVisible('bolt-modal')) {
          screenshots[size].modalOpened = await page.screenshot();
          expect(screenshots[size].modalOpened).toMatchImageSnapshot(
            vrtDefaultConfig,
          );
          await page.tap('bolt-button'); // closes modal
          await page.waitFor(500);
        }
      }
    },
    timeout,
  );
});
