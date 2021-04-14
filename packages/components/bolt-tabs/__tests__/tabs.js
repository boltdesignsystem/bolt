import {
  render,
  stopServer,
  html,
  basicTest,
  basicPropTest,
} from '../../../testing/testing-helpers';
import schema from '../tabs.schema';
const { align, inset } = schema.properties;
let page, tabsInnerHTML;

beforeEach(async () => {
  await page.evaluate(() => {
    document.body.innerHTML = '';
  });
  await page.setViewport({ width: 600, height: 200 });
});

beforeAll(async () => {
  page = await global.__BROWSER__.newPage();
  await page.goto('http://127.0.0.1:4444/', {
    timeout: 0,
  });
});

afterAll(async () => {
  await stopServer();
  await page.close();
});

describe('Bolt Tabs', () => {
  beforeAll(() => {
    tabsInnerHTML = `
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
  });

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
    if (await results) {
      basicTest(results);
    }
  });

  align.enum.forEach(option => {
    test(`Align: ${option}`, async () => {
      const tabsOuter = await page.evaluate(
        async (option, tabsInnerHTML) => {
          //basicPropTest(tabsInnerHTML, 'bolt-tabs', 'align', option);
          const wrapper = document.createElement('div');
          wrapper.innerHTML = tabsInnerHTML;
          document.body.appendChild(wrapper);

          await customElements.whenDefined('ssr-keep');
          await customElements.whenDefined('bolt-tabs');
          const tabs = document.querySelector('bolt-tabs');
          tabs.setAttribute('align', option);

          // @TODO This should work, but throws mysterious error: `TypeError: Cannot read property 'forEach' of undefined`
          // await tabs.updateComplete;

          return tabs.outerHTML;
        },
        option,
        tabsInnerHTML,
      );

      // await page.waitFor(500);
      const renderedHTML = await html(tabsOuter);

      // await page.waitFor(500);
      await expect(renderedHTML).toMatchSnapshot();
    });
  });

  inset.enum.forEach(async option => {
    test(`Inset: ${option}`, async () => {
      const tabsOuter = await page.evaluate(
        async (option, tabsInnerHTML) => {
          const wrapper = document.createElement('div');
          wrapper.innerHTML = tabsInnerHTML;
          document.body.appendChild(wrapper);

          await customElements.whenDefined('ssr-keep');
          await customElements.whenDefined('bolt-tabs');
          const tabs = document.querySelector('bolt-tabs');
          const tabPanels = Array.from(
            document.querySelectorAll('bolt-tab-panel'),
          );

          tabs.setAttribute('inset', option);
          [tabs, ...tabPanels].forEach(el => el.requestUpdate());

          await Promise.all([
            tabs.updateComplete,
            [tabs, ...tabPanels].forEach(el => {
              return el.updateComplete;
            }),
          ]);

          return tabs.outerHTML;
        },
        option,
        tabsInnerHTML,
      );

      // await page.waitFor(500);
      const renderedHTML = await html(tabsOuter);
      // await page.waitFor(500);
      await expect(renderedHTML).toMatchSnapshot();
    });
  });

  // test('Web Component usage (Shadow DOM)', async () => {
  //   const tabsOuter = await page.evaluate(async tabsInnerHTML => {
  //     const wrapper = document.createElement('div');
  //     wrapper.innerHTML = tabsInnerHTML;
  //     document.body.appendChild(wrapper);

  //     await customElements.whenDefined('ssr-keep');
  //     await customElements.whenDefined('bolt-tabs');
  //     const tabs = document.querySelector('bolt-tabs');
  //     await tabs.updateComplete;

  //     return tabs.outerHTML;
  //   }, tabsInnerHTML);

  //   await page.waitFor(500);
  //   const renderedHTML = await html(tabsOuter);

  //   await page.waitFor(500);
  //   expect(renderedHTML).toMatchSnapshot();
  // });

  // @TODO Turn off until bugs with "conditional-shadow-dom" are resolved,
  // causes a series of re-renders that makes querying the rendered DOM impossible
  // test('Web Component usage (Light DOM)', async () => {
  //   const tabsOuter = await page.evaluate(async tabsInnerHTML => {
  //     const wrapper = document.createElement('div');
  //     wrapper.innerHTML = tabsInnerHTML;
  //     document.body.appendChild(wrapper);

  //     await Promise.all([
  //       customElements.whenDefined('ssr-keep'),
  //       customElements.whenDefined('bolt-tabs'),
  //     ]);

  //     const tabs = document.querySelector('bolt-tabs');
  //     const tabPanels = document.querySelectorAll('bolt-tab-panel');

  //     [tabs, ...tabPanels].forEach(el => {
  //       el.setAttribute('no-shadow', '');
  //       el.requestUpdate();
  //     });

  //     await Promise.all([
  //       tabs.updateComplete,
  //       [tabs, ...tabPanels].forEach(el => {
  //         return el.updateComplete;
  //       }),
  //     ]);

  //     return tabs.outerHTML;
  //   }, tabsInnerHTML);

  //   const renderedHTML = await html(tabsOuter);
  //   expect(renderedHTML).toMatchSnapshot();
  // });
});
