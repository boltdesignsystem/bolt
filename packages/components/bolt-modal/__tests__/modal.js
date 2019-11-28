/* eslint-disable no-await-in-loop */
import {
  render,
  renderString,
  stop as stopTwigRenderer,
} from '@bolt/twig-renderer';
import { fixture as html } from '@open-wc/testing-helpers';

const { readYamlFileSync } = require('@bolt/build-tools/utils/yaml');
const { join } = require('path');
const schema = readYamlFileSync(join(__dirname, '../modal.schema.yml'));
const { width, spacing, theme, scroll } = schema.properties;

async function renderTwig(template, data) {
  return await render(template, data, true);
}

async function renderTwigString(template, data) {
  return await renderString(template, data, true);
}

const imageVrtConfig = {
  failureThreshold: '0.02',
  failureThresholdType: 'percent',
  customDiffConfig: {
    threshold: '0.1',
    includeAA: true,
  },
};

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

const modalContent = [
  {
    name: 'Simple usage',
    content: `<bolt-text>This is the body (default).</bolt-text>`,
  },
  {
    name: 'Long content usage',
    content: `
      <bolt-text headline font-size="xxlarge">This is the very long body text.</bolt-text>
      <bolt-image src="/fixtures/1200x660.jpg" alt="Placeholder"></bolt-image>
      <bolt-text>Amet tellus cras adipiscing enim eu turpis egestas pretium aenean. Enim eu turpis egestas pretium aenean. Diam sit amet nisl suscipit adipiscing bibendum est. Elementum nisi quis eleifend quam adipiscing vitae proin. Dolor purus non enim praesent. Laoreet id donec ultrices tincidunt arcu non. Arcu ac tortor dignissim convallis. Quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis. Tellus integer feugiat scelerisque varius morbi enim nunc. Porttitor massa id neque aliquam vestibulum morbi. Eros in cursus turpis massa tincidunt dui. Est pellentesque elit ullamcorper dignissim cras.</bolt-text>
      <bolt-text>Sed elementum tempus egestas sed sed risus pretium quam vulputate. Faucibus turpis in eu mi bibendum. In ornare quam viverra orci sagittis eu volutpat. Pellentesque habitant morbi tristique senectus et netus et malesuada. Non tellus orci ac auctor augue. Imperdiet massa tincidunt nunc pulvinar sapien. Ut aliquam purus sit amet luctus. Fames ac turpis egestas sed tempus urna et pharetra pharetra. Lacinia quis vel eros donec ac odio tempor orci dapibus. Varius vel pharetra vel turpis nunc eget lorem dolor sed. Libero id faucibus nisl tincidunt eget nullam. Congue quisque egestas diam in arcu cursus euismod quis.</bolt-text>
    </bolt-text>`,
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
    await stopTwigRenderer();
    await page.close();
  });

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

  modalContent.forEach(async contentChoice => {
    test(`${contentChoice.name} <bolt-modal> with Shadow DOM renders`, async () => {
      const renderedModal = await page.evaluate(async contentChoice => {
        const modal = document.createElement('bolt-modal');
        modal.setAttribute('uuid', '12345');
        modal.innerHTML = `<bolt-text tag="h3" slot="header">This is the header</bolt-text>
            ${contentChoice.content}
            <bolt-text slot="footer">This is the footer</bolt-text>`;
        document.body.appendChild(modal);
        modal.updated();
        modal.show();
        return modal.outerHTML;
      }, contentChoice);

      const renderedHTML = await html(renderedModal);

      await page.waitFor(1000); // wait a second before testing
      const image = await page.screenshot();

      expect(image).toMatchImageSnapshot(imageVrtConfig);

      expect(renderedHTML).toMatchSnapshot();
    });
  });

  modalContent.forEach(async contentChoice => {
    test(`${contentChoice.name} <bolt-modal> w/o Shadow DOM renders`, async () => {
      const renderedModal = await page.evaluate(contentChoice => {
        const modal = document.createElement('bolt-modal');
        modal.setAttribute('uuid', '12345');
        modal.innerHTML = `<bolt-text tag="h3" slot="header">This is the header</bolt-text>
            ${contentChoice.content}
            <bolt-text slot="footer">This is the footer</bolt-text>`;
        document.body.appendChild(modal);
        modal.useShadow = false;
        modal.updated();
        modal.show();
        return modal.outerHTML;
      }, contentChoice);

      const renderedHTML = await html(renderedModal);

      await page.waitFor(1000); // wait a second before testing
      const image = await page.screenshot();

      expect(image).toMatchImageSnapshot(imageVrtConfig);

      expect(renderedHTML).toMatchSnapshot();
    });
  });

  modalContent.forEach(async contentChoice => {
    test(
      `${contentChoice.name} <bolt-modal> rendered by Twig`,
      async () => {
        const { html, ok } = await renderTwig(
          '@bolt-components-modal/modal.twig',
          {
            content: `<bolt-text tag="h3" slot="header">This is the header</bolt-text>
              ${contentChoice.content}
              <bolt-text slot="footer">This is the footer</bolt-text>`,
          },
        );
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
              imageVrtConfig,
            );
            await page.tap('bolt-button'); // closes modal
            await page.waitFor(500);
          }
        }
      },
      timeout,
    );
  });

  test(
    '<bolt-band> with long text in <bolt-modal> rendered by Twig',
    async () => {
      const bandWithLongContent = await render(
        '@bolt-components-band/band.twig',
        {
          content: modalContent[1].content,
          full_bleed: false,
          theme: 'none',
        },
      );

      const { html, ok } = await renderTwig(
        '@bolt-components-modal/modal.twig',
        {
          content: `<bolt-text tag="h3" slot="header">This is the header</bolt-text>
            ${bandWithLongContent.html}
            <bolt-text slot="footer">This is the footer</bolt-text>`,
        },
      );
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
            imageVrtConfig,
          );
          await page.tap('bolt-button'); // closes modal
          await page.waitFor(500);
        }
      }
    },
    timeout,
  );
});
