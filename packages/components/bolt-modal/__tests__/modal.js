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
const { persistent, width, spacing, theme, scroll } = schema.properties;

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
  '<bolt-text tag="h3" slot="header">This is the header</bolt-text><bolt-text>This is the body (default).</bolt-text><bolt-text slot="footer">This is the footer</bolt-text>',
  `<bolt-text tag="h3" slot="header">This is the header</bolt-text>
    <bolt-text>
      <p>This is the very long body text(default).</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed id semper risus in hendrerit. Vitae nunc sed velit dignissim sodales ut eu sem integer. Vulputate mi sit amet mauris commodo quis imperdiet massa. Et netus et malesuada fames ac. Nibh mauris cursus mattis molestie a iaculis at erat pellentesque. Tortor condimentum lacinia quis vel eros donec ac odio. Volutpat sed cras ornare arcu dui vivamus arcu felis bibendum. Et egestas quis ipsum suspendisse ultrices. Facilisi morbi tempus iaculis urna id volutpat. Cras fermentum odio eu feugiat. Felis donec et odio pellentesque diam.</p>
      <p>Amet tellus cras adipiscing enim eu turpis egestas pretium aenean. Enim eu turpis egestas pretium aenean. Diam sit amet nisl suscipit adipiscing bibendum est. Elementum nisi quis eleifend quam adipiscing vitae proin. Dolor purus non enim praesent. Laoreet id donec ultrices tincidunt arcu non. Arcu ac tortor dignissim convallis. Quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis. Tellus integer feugiat scelerisque varius morbi enim nunc. Porttitor massa id neque aliquam vestibulum morbi. Eros in cursus turpis massa tincidunt dui. Est pellentesque elit ullamcorper dignissim cras.</p>
      <p>Sed elementum tempus egestas sed sed risus pretium quam vulputate. Faucibus turpis in eu mi bibendum. In ornare quam viverra orci sagittis eu volutpat. Pellentesque habitant morbi tristique senectus et netus et malesuada. Non tellus orci ac auctor augue. Imperdiet massa tincidunt nunc pulvinar sapien. Ut aliquam purus sit amet luctus. Fames ac turpis egestas sed tempus urna et pharetra pharetra. Lacinia quis vel eros donec ac odio tempor orci dapibus. Varius vel pharetra vel turpis nunc eget lorem dolor sed. Libero id faucibus nisl tincidunt eget nullam. Congue quisque egestas diam in arcu cursus euismod quis.</p>
    </bolt-text>
    <bolt-text slot="footer">This is the footer</bolt-text>`,
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

    expect(image).toMatchImageSnapshot(imageVrtConfig);

    expect(renderedHTML).toMatchSnapshot();
  });

  test('Long text <bolt-modal> with Shadow DOM renders', async function() {
    const renderedModal = await page.evaluate(async () => {
      const modal = document.createElement('bolt-modal');
      modal.setAttribute('uuid', '12345');
      modal.innerHTML = `<bolt-text tag="h3" slot="header">This is the header</bolt-text>
      <bolt-text>
        <p>This is the very long body text(default).</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed id semper risus in hendrerit. Vitae nunc sed velit dignissim sodales ut eu sem integer. Vulputate mi sit amet mauris commodo quis imperdiet massa. Et netus et malesuada fames ac. Nibh mauris cursus mattis molestie a iaculis at erat pellentesque. Tortor condimentum lacinia quis vel eros donec ac odio. Volutpat sed cras ornare arcu dui vivamus arcu felis bibendum. Et egestas quis ipsum suspendisse ultrices. Facilisi morbi tempus iaculis urna id volutpat. Cras fermentum odio eu feugiat. Felis donec et odio pellentesque diam.</p>
        <p>Amet tellus cras adipiscing enim eu turpis egestas pretium aenean. Enim eu turpis egestas pretium aenean. Diam sit amet nisl suscipit adipiscing bibendum est. Elementum nisi quis eleifend quam adipiscing vitae proin. Dolor purus non enim praesent. Laoreet id donec ultrices tincidunt arcu non. Arcu ac tortor dignissim convallis. Quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis. Tellus integer feugiat scelerisque varius morbi enim nunc. Porttitor massa id neque aliquam vestibulum morbi. Eros in cursus turpis massa tincidunt dui. Est pellentesque elit ullamcorper dignissim cras.</p>
        <p>Sed elementum tempus egestas sed sed risus pretium quam vulputate. Faucibus turpis in eu mi bibendum. In ornare quam viverra orci sagittis eu volutpat. Pellentesque habitant morbi tristique senectus et netus et malesuada. Non tellus orci ac auctor augue. Imperdiet massa tincidunt nunc pulvinar sapien. Ut aliquam purus sit amet luctus. Fames ac turpis egestas sed tempus urna et pharetra pharetra. Lacinia quis vel eros donec ac odio tempor orci dapibus. Varius vel pharetra vel turpis nunc eget lorem dolor sed. Libero id faucibus nisl tincidunt eget nullam. Congue quisque egestas diam in arcu cursus euismod quis.</p>
      </bolt-text>
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

    expect(image).toMatchImageSnapshot(imageVrtConfig);

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

    expect(image).toMatchImageSnapshot(imageVrtConfig);

    expect(renderedHTML).toMatchSnapshot();
  });

  test('Long text <bolt-modal> w/o Shadow DOM renders', async function() {
    const renderedModal = await page.evaluate(() => {
      const modal = document.createElement('bolt-modal');
      modal.setAttribute('uuid', '12345');
      modal.innerHTML = `<bolt-text tag="h3" slot="header">This is the header</bolt-text>
      <bolt-text>
        <p>This is the very long body text(default).</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed id semper risus in hendrerit. Vitae nunc sed velit dignissim sodales ut eu sem integer. Vulputate mi sit amet mauris commodo quis imperdiet massa. Et netus et malesuada fames ac. Nibh mauris cursus mattis molestie a iaculis at erat pellentesque. Tortor condimentum lacinia quis vel eros donec ac odio. Volutpat sed cras ornare arcu dui vivamus arcu felis bibendum. Et egestas quis ipsum suspendisse ultrices. Facilisi morbi tempus iaculis urna id volutpat. Cras fermentum odio eu feugiat. Felis donec et odio pellentesque diam.</p>
        <p>Amet tellus cras adipiscing enim eu turpis egestas pretium aenean. Enim eu turpis egestas pretium aenean. Diam sit amet nisl suscipit adipiscing bibendum est. Elementum nisi quis eleifend quam adipiscing vitae proin. Dolor purus non enim praesent. Laoreet id donec ultrices tincidunt arcu non. Arcu ac tortor dignissim convallis. Quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis. Tellus integer feugiat scelerisque varius morbi enim nunc. Porttitor massa id neque aliquam vestibulum morbi. Eros in cursus turpis massa tincidunt dui. Est pellentesque elit ullamcorper dignissim cras.</p>
        <p>Sed elementum tempus egestas sed sed risus pretium quam vulputate. Faucibus turpis in eu mi bibendum. In ornare quam viverra orci sagittis eu volutpat. Pellentesque habitant morbi tristique senectus et netus et malesuada. Non tellus orci ac auctor augue. Imperdiet massa tincidunt nunc pulvinar sapien. Ut aliquam purus sit amet luctus. Fames ac turpis egestas sed tempus urna et pharetra pharetra. Lacinia quis vel eros donec ac odio tempor orci dapibus. Varius vel pharetra vel turpis nunc eget lorem dolor sed. Libero id faucibus nisl tincidunt eget nullam. Congue quisque egestas diam in arcu cursus euismod quis.</p>
      </bolt-text>
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

    expect(image).toMatchImageSnapshot(imageVrtConfig);

    expect(renderedHTML).toMatchSnapshot();
  });

  modalContent.forEach(async modalContentChoice => {
    test(
      '<bolt-modal> rendered by Twig',
      async () => {
        const { html, ok } = await renderTwig(
          '@bolt-components-modal/modal.twig',
          {
            content: modalContentChoice,
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
});
