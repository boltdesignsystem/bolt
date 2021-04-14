import {
  render,
  stopServer,
  html,
  basicTest,
  basicPropTest,
} from '../../../testing/testing-helpers';
import schema from '../tabs.schema';

let page, tabsInnerHTML;

const { align, inset } = schema.properties;

beforeAll(async () => {
  page = await global.__BROWSER__.newPage();
  await page.goto('http://127.0.0.1:4444/', {
    timeout: 0,
  });
});

beforeEach(async () => {
  await page.evaluate(() => {
    document.body.innerHTML = '';
  });
});

afterAll(async () => {
  await stopServer();
  await page.close();
});

describe('Twig usage', () => {
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

  // test('Content output', async () => {
  //   const results = await render('@bolt-components-tabs/tabs.twig', {
  //     panels: [
  //       {
  //         label: 'Tab label 1',
  //         content: 'This is the tab content.',
  //       },
  //       {
  //         label: 'Tab label 2',
  //         content: 'This is the tab content.',
  //       },
  //       {
  //         label: 'Tab label 3',
  //         content: 'This is the tab content.',
  //       },
  //     ],
  //   });
  //   if (await results) {
  //     basicTest(results);
  //   }
  // });

  align.enum.forEach(option => {
    test(`Align output: ${option}`, async () => {
      basicPropTest(page, html, tabsInnerHTML, 'bolt-tabs', 'align', option);
    });
  });

  // inset.enum.forEach(async option => {
  //   test(`Inset output: ${option}`, async () => {
  //     const tabsOuter = await page.evaluate(
  //       async (option, tabsInnerHTML) => {
  //         const wrapper = document.createElement('div');
  //         wrapper.innerHTML = tabsInnerHTML;
  //         document.body.appendChild(wrapper);

  //         await customElements.whenDefined('ssr-keep');
  //         await customElements.whenDefined('bolt-tabs');
  //         const tabs = document.querySelector('bolt-tabs');
  //         const tabPanels = Array.from(
  //           document.querySelectorAll('bolt-tab-panel'),
  //         );

  //         tabs.setAttribute('inset', option);
  //         [tabs, ...tabPanels].forEach(el => el.requestUpdate());

  //         await Promise.all([
  //           tabs.updateComplete,
  //           [tabs, ...tabPanels].forEach(el => {
  //             return el.updateComplete;
  //           }),
  //         ]);

  //         return tabs.outerHTML;
  //       },
  //       option,
  //       tabsInnerHTML,
  //     );

  //     console.log('tabsOuter');
  //     console.log(tabsOuter);

  //     const renderedHTML = await html(tabsOuter);
  //     await expect(renderedHTML).toMatchSnapshot();
  //   });
  // });
});

// describe('Web Component usage', () => {
//   test('Shadow DOM', async () => {
//     await page.waitFor(500);
//     const renderedHTML = await html(tabsOuterDark);

//     // await page.waitFor(500);
//     // const image = await page.screenshot();

//     expect(renderedHTML).toMatchSnapshot();
//   });

//   test('Light DOM', async () => {
//     const renderedHTML = await html(tabsOuterLight);

//     // await page.waitFor(500);
//     // const image = await page.screenshot();

//     expect(renderedHTML).toMatchSnapshot();
//   });
// });

//
//
//
//
//
//
//
//

//import { basicTest } from '../../../testing/testing-helpers';

// const vrtDefaultConfig = Object.assign(vrtConfig, {
//   failureThreshold: '0.02',
// });

// const timeout = 120000;

// const tabsInnerHTML = `
//   <bolt-tabs>
//     <bolt-tab-panel>
//       <div slot="label">Tab label 1</div>
//       Tab panel 1
//     </bolt-tab-panel>
//     <bolt-tab-panel>
//       <div slot="label">Tab label 2</div>
//       Tab panel 2
//     </bolt-tab-panel>
//     <bolt-tab-panel>
//       <div slot="label">Tab label 3</div>
//       Tab panel 3
//     </bolt-tab-panel>
//   </bolt-tabs>
// `;

// let page, tabsOuterDark, tabsOuterLight;

// beforeEach(async () => {
//   await page.evaluate(() => {
//     document.body.innerHTML = '';
//   });
//   await page.setViewport({ width: 600, height: 200 });
// }, timeout);

// beforeAll(async () => {
//   page = await global.__BROWSER__.newPage();
//   await page.goto('http://127.0.0.1:4444/', {
//     timeout: 0,
//   });

//   tabsOuterDark = await page.evaluate(async tabsInnerHTML => {
//     const wrapper = document.createElement('div');
//     wrapper.innerHTML = tabsInnerHTML;
//     document.body.appendChild(wrapper);

//     await customElements.whenDefined('ssr-keep');
//     await customElements.whenDefined('bolt-tabs');
//     const tabs = document.querySelector('bolt-tabs');
//     await tabs.updateComplete;

//     return tabs.outerHTML;
//   }, tabsInnerHTML);

//   tabsOuterLight = await page.evaluate(async tabsInnerHTML => {
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
// }, timeout);

// afterAll(async () => {
//   await stopServer();
//   await page.close();
// }, timeout);

// describe('Twig usage', () => {
// test('Content output', async () => {
//   const results = await render('@bolt-components-tabs/tabs.twig', {
//     panels: [
//       {
//         label: 'Tab label 1',
//         content: 'This is the tab content.',
//       },
//       {
//         label: 'Tab label 2',
//         content: 'This is the tab content.',
//       },
//       {
//         label: 'Tab label 3',
//         content: 'This is the tab content.',
//       },
//     ],
//   });
//   expect(results.ok).toBe(true);
//   expect(results.html).toMatchSnapshot();
// });

// align.enum.forEach(option => {
//   test(`Align output: ${option}`, async () => {
//     const tabsOuter = await page.evaluate(
//       async (option, tabsInnerHTML) => {
//         const wrapper = document.createElement('div');
//         wrapper.innerHTML = tabsInnerHTML;
//         document.body.appendChild(wrapper);

//         await customElements.whenDefined('ssr-keep');
//         await customElements.whenDefined('bolt-tabs');
//         const tabs = document.querySelector('bolt-tabs');
//         tabs.setAttribute('align', option);

//         // @TODO This should work, but throws mysterious error: `TypeError: Cannot read property 'forEach' of undefined`
//         // await tabs.updateComplete;

//         return tabs.outerHTML;
//       },
//       option,
//       tabsInnerHTML,
//     );

//     await page.waitFor(500);
//     const renderedHTML = await html(tabsOuter);

//     await page.waitFor(500);
//     const image = await page.screenshot();

//     expect(renderedHTML).toMatchSnapshot();
//   });
// });

//   inset.enum.forEach(async option => {
//     test(`Inset output: ${option}`, async () => {
//       const tabsOuter = await page.evaluate(
//         async (option, tabsInnerHTML) => {
//           const wrapper = document.createElement('div');
//           wrapper.innerHTML = tabsInnerHTML;
//           document.body.appendChild(wrapper);

//           await customElements.whenDefined('ssr-keep');
//           await customElements.whenDefined('bolt-tabs');
//           const tabs = document.querySelector('bolt-tabs');
//           const tabPanels = Array.from(
//             document.querySelectorAll('bolt-tab-panel'),
//           );

//           tabs.setAttribute('inset', option);
//           [tabs, ...tabPanels].forEach(el => el.requestUpdate());

//           await Promise.all([
//             tabs.updateComplete,
//             [tabs, ...tabPanels].forEach(el => {
//               return el.updateComplete;
//             }),
//           ]);

//           return tabs.outerHTML;
//         },
//         option,
//         tabsInnerHTML,
//       );

//       await page.waitFor(500);
//       const renderedHTML = await html(tabsOuter);

//       await page.waitFor(500);
//       const image = await page.screenshot();

//       expect(renderedHTML).toMatchSnapshot();
//     });
//   });
// });
