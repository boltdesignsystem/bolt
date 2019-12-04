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
      <bolt-text>Sed elementum tempus egestas sed sed risus pretium quam vulputate. Faucibus turpis in eu mi bibendum. In ornare quam viverra orci sagittis eu volutpat. Pellentesque habitant morbi tristique senectus et netus et malesuada. Non tellus orci ac auctor augue. Imperdiet massa tincidunt nunc pulvinar sapien. Ut aliquam purus sit amet luctus. Fames ac turpis egestas sed tempus urna et pharetra pharetra. Lacinia quis vel eros donec ac odio tempor orci dapibus. Varius vel pharetra vel turpis nunc eget lorem dolor sed. Libero id faucibus nisl tincidunt eget nullam. Congue quisque egestas diam in arcu cursus euismod quis.</bolt-text>`,
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

  modalContent.forEach(async contentChoice => {
    test(`${contentChoice.name} <bolt-modal> with Shadow DOM renders`, async () => {
      const renderedModal = await page.evaluate(async contentChoice => {
        const modal = document.createElement('bolt-modal');
        modal.setAttribute('uuid', '12345');
        modal.setAttribute('width', 'regular');
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

      expect(image).toMatchImageSnapshot(vrtDefaultConfig);

      expect(renderedHTML).toMatchSnapshot();
    });
  });

  modalContent.forEach(async contentChoice => {
    test(`${contentChoice.name} <bolt-modal> w/o Shadow DOM renders`, async () => {
      const renderedModal = await page.evaluate(contentChoice => {
        const modal = document.createElement('bolt-modal');
        modal.setAttribute('uuid', '12345');
        modal.setAttribute('width', 'regular');
        modal.innerHTML = `<bolt-text tag="h3" slot="header">This is the header</bolt-text>${contentChoice.content}<bolt-text slot="footer">This is the footer</bolt-text>`;
        document.body.appendChild(modal);
        modal.useShadow = false;
        modal.updated();
        modal.show();
        return modal.outerHTML;
      }, contentChoice);

      const renderedHTML = await html(renderedModal);

      await page.waitFor(1000); // wait a second before testing
      const image = await page.screenshot();

      expect(image).toMatchImageSnapshot(vrtDefaultConfig);

      expect(renderedHTML).toMatchSnapshot();
    });
  });

  modalContent.forEach(async contentChoice => {
    test(
      `${contentChoice.name} <bolt-modal> at various viewport sizes`,
      async () => {
        const { html, ok } = await render('@bolt-components-modal/modal.twig', {
          content: `<bolt-text tag="h3" slot="header">This is the header</bolt-text>${contentChoice.content}<bolt-text slot="footer">This is the footer</bolt-text>`,
          width: 'regular',
        });
        expect(ok).toBe(true);
        expect(html).toMatchSnapshot();

        await page.evaluate(html => {
          document.body.innerHTML = html;
        }, html);

        const screenshots = [];

        for (const item of viewportSizes) {
          const { height, width, size } = item;

          screenshots[size] = [];

          await page.setViewport({ height, width });
          await page.evaluate(() => {
            document.querySelector('bolt-modal').show();
          });
          await page.waitFor(500);

          screenshots[size].modalOpened = await page.screenshot();
          expect(screenshots[size].modalOpened).toMatchImageSnapshot(
            vrtDefaultConfig,
          );

          await page.evaluate(() => {
            document.querySelector('bolt-modal').hide();
          });
          await page.waitFor(500);
        }
      },
      timeout,
    );
  });

  modalContent.forEach(async contentChoice => {
    test(
      `${contentChoice.name}<bolt-modal> with band at various viewport sizes`,
      async () => {
        const renderedBand = await render('@bolt-components-band/band.twig', {
          content: contentChoice.content,
          full_bleed: false,
          theme: 'none',
        });

        const { html, ok } = await render('@bolt-components-modal/modal.twig', {
          content: `<bolt-text tag="h3" slot="header">This is the header</bolt-text>
              ${renderedBand.html}
              <bolt-text slot="footer">This is the footer</bolt-text>`,
          width: 'regular',
        });
        expect(ok).toBe(true);
        expect(html).toMatchSnapshot();

        await page.evaluate(html => {
          document.body.innerHTML = html;
        }, html);

        const screenshots = [];

        for (const item of viewportSizes) {
          const { height, width, size } = item;
          screenshots[size] = [];

          await page.setViewport({ height, width });
          await page.evaluate(() => {
            document.querySelector('bolt-modal').show();
          });
          await page.waitFor(500);

          screenshots[size].modalOpened = await page.screenshot();
          expect(screenshots[size].modalOpened).toMatchImageSnapshot({
            vrtDefaultConfig,
          });

          await page.evaluate(() => {
            document.querySelector('bolt-modal').hide();
          });
          await page.waitFor(500);
        }
      },
      timeout,
    );
  });
});
