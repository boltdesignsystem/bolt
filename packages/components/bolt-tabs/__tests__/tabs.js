import {
  render,
  stopServer,
  html,
  vrtDefaultConfig as vrtConfig,
} from '../../../testing/testing-helpers';

const { readYamlFileSync } = require('@bolt/build-tools/utils/yaml');
const { join } = require('path');
const schema = readYamlFileSync(join(__dirname, '../tabs.schema.yml'));
const { align, inset } = schema.properties;

const vrtDefaultConfig = Object.assign(vrtConfig, {
  failureThreshold: '0.02',
});

const timeout = 120000;

const tabsInnerHTML = `
  <bolt-tabs>
    <bolt-tab-panel>
      <div slot="label">Tab label 1</div>
      Tab panel 1
    </bolt-tab-panel>
    <bolt-tab-panel>
      <div slot="label">Tab label 2</div>
      Tab panel 2
    </bolt-tab-panel>
    <bolt-tab-panel>
      <div slot="label">Tab label 3</div>
      Tab panel 3
    </bolt-tab-panel>
  </bolt-tabs>
`;

describe('Bolt Tabs', () => {
  let page;

  beforeEach(async () => {
    await page.evaluate(() => {
      document.body.innerHTML = '';
    });
    await page.setViewport({ width: 600, height: 200 });
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

  test('Twig usage', async () => {
    const results = await render('@bolt-components-tabs/tabs.twig', {
      panels: [
        {
          label: 'Tab label 1',
          content: 'This is the tab content.',
        },
        {
          label: 'Tab label 2',
          content: 'This is the tab content.',
        },
        {
          label: 'Tab label 3',
          content: 'This is the tab content.',
        },
      ],
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('Web Component usage (Shadow DOM)', async () => {
    const tabsOuter = await page.evaluate((tabsInnerHTML) => {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = tabsInnerHTML;
      document.body.appendChild(wrapper);

      const tabs = document.querySelector('bolt-tabs');
      const tabPanels = Array.from(document.querySelectorAll('bolt-tab-panel'));
      [tabs, ...tabPanels].forEach((el) => el.updated());

      return tabs.outerHTML;
    }, tabsInnerHTML);

    await page.waitFor(500);
    const renderedHTML = await html(tabsOuter);

    await page.waitFor(500);
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot(vrtDefaultConfig);
    expect(renderedHTML).toMatchSnapshot();
  });

  test('Web Component usage (Light DOM)', async () => {
    const tabsOuter = await page.evaluate(async (tabsInnerHTML) => {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = tabsInnerHTML;
      document.body.appendChild(wrapper);

      const tabs = document.querySelector('bolt-tabs');
      const tabPanels = Array.from(document.querySelectorAll('bolt-tab-panel'));
      [tabs, ...tabPanels].forEach((el) => {
        el.setAttribute('no-shadow', '');
      });

      const undefinedElements = document.querySelectorAll(
        'bolt-tabs',
        'bolt-tab-panel',
      );
      const promises = [...undefinedElements].map((elem) =>
        customElements.whenDefined(elem.localName),
      );
      await Promise.all(promises);

      return tabs.outerHTML;
    }, tabsInnerHTML);

    await page.waitFor(500);
    const renderedHTML = await html(tabsOuter);

    await page.waitFor(500);
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot(vrtDefaultConfig);
    expect(renderedHTML).toMatchSnapshot();
  });

  align.enum.forEach(async (option) => {
    test(`Align: ${option}`, async () => {
      const tabsOuter = await page.evaluate(
        (option, tabsInnerHTML) => {
          const wrapper = document.createElement('div');
          wrapper.innerHTML = tabsInnerHTML;
          document.body.appendChild(wrapper);

          const tabs = document.querySelector('bolt-tabs');
          const tabPanels = Array.from(
            document.querySelectorAll('bolt-tab-panel'),
          );
          tabs.setAttribute('align', option);
          [tabs, ...tabPanels].forEach((el) => el.updated());

          return tabs.outerHTML;
        },
        option,
        tabsInnerHTML,
      );

      await page.waitFor(500);
      const renderedHTML = await html(tabsOuter);

      await page.waitFor(500);
      const image = await page.screenshot();

      expect(image).toMatchImageSnapshot(vrtDefaultConfig);
      expect(renderedHTML).toMatchSnapshot();
    });
  });

  inset.enum.forEach(async (option) => {
    test(`Inset: ${option}`, async () => {
      const tabsOuter = await page.evaluate(
        (option, tabsInnerHTML) => {
          const wrapper = document.createElement('div');
          wrapper.innerHTML = tabsInnerHTML;
          document.body.appendChild(wrapper);

          const tabs = document.querySelector('bolt-tabs');
          const tabPanels = Array.from(
            document.querySelectorAll('bolt-tab-panel'),
          );

          tabs.setAttribute('inset', option);
          [tabs, ...tabPanels].forEach((el) => el.updated());

          return tabs.outerHTML;
        },
        option,
        tabsInnerHTML,
      );

      await page.waitFor(500);
      const renderedHTML = await html(tabsOuter);

      await page.waitFor(500);
      const image = await page.screenshot();

      expect(image).toMatchImageSnapshot(vrtDefaultConfig);
      expect(renderedHTML).toMatchSnapshot();
    });
  });
});
