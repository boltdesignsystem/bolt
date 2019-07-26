// import {
//   render,
//   renderString,
//   stop as stopTwigRenderer,
// } from '@bolt/twig-renderer';
// import { fixture as html } from '@open-wc/testing-helpers';
// const { readYamlFileSync } = require('@bolt/build-tools/utils/yaml');
// const { join } = require('path');
// const schema = readYamlFileSync(join(__dirname, '../tabs.schema.yml'));
// const { single, spacing } = schema.properties;

// async function renderTwig(template, data) {
//   return await render(template, data, true);
// }

// async function renderTwigString(template, data) {
//   return await renderString(template, data, true);
// }

// const timeout = 120000;

// describe('<bolt-tabs> Component', () => {
//   let page;

//   beforeEach(async () => {
//     page = await global.__BROWSER__.newPage();
//     await page.goto('http://127.0.0.1:4444/', {
//       waitUntil: 'networkidle0',
//     });
//   }, timeout);

//   afterAll(async () => {
//     await stopTwigRenderer();
//   }, timeout);

//   test('basic usage', async () => {
//     const results = await renderTwig('@bolt-components-tabs/tabs.twig', {
//       items: [
//         {
//           label: 'Tabs item 1',
//           content: 'This is the tabs content.',
//         },
//         {
//           label: 'Tabs item 2',
//           content: 'This is the tabs content.',
//         },
//         {
//           label: 'Tabs item 3',
//           content: 'This is the tabs content.',
//         },
//       ],
//     });
//     expect(results.ok).toBe(true);
//     expect(results.html).toMatchSnapshot();
//   });

//   single.enum.forEach(async singleChoice => {
//     test(`expand single items: ${singleChoice}`, async () => {
//       const results = await renderTwig('@bolt-components-tabs/tabs.twig', {
//         single: singleChoice,
//         items: [
//           {
//             label: 'Tabs item 1',
//             content: 'This is the tabs content.',
//           },
//           {
//             label: 'Tabs item 2',
//             content: 'This is the tabs content.',
//           },
//           {
//             label: 'Tabs item 3',
//             content: 'This is the tabs content.',
//           },
//         ],
//       });
//       expect(results.ok).toBe(true);
//       expect(results.html).toMatchSnapshot();
//     });
//   });

//   spacing.enum.forEach(async spacingChoice => {
//     test(`spacing: ${spacingChoice}`, async () => {
//       const results = await renderTwig('@bolt-components-tabs/tabs.twig', {
//         spacing: spacingChoice,
//         items: [
//           {
//             label: 'Tabs item 1',
//             content: 'This is the tabs content.',
//           },
//           {
//             label: 'Tabs item 2',
//             content: 'This is the tabs content.',
//           },
//           {
//             label: 'Tabs item 3',
//             content: 'This is the tabs content.',
//           },
//         ],
//       });
//       expect(results.ok).toBe(true);
//       expect(results.html).toMatchSnapshot();
//     });
//   });

//   test('Default <bolt-tabs> with Shadow DOM renders', async function() {
//     const defaultTabsShadowRoot = await page.evaluate(() => {
//       const tabs = document.createElement('bolt-tabs');
//       tabs.innerHTML = `
//         <bolt-tab-panel>
//           <bolt-text slot="label">Tabs item 1</bolt-text>
//           <bolt-text>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</bolt-text>
//         </bolt-tab-panel>
//         <bolt-tab-panel>
//           <bolt-text slot="label">Tabs item 2</bolt-text>
//           <bolt-text>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</bolt-text>
//         </bolt-tab-panel>
//         <bolt-tab-panel>
//           <bolt-text slot="label">Tabs item 3</bolt-text>
//           <bolt-text>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</bolt-text>
//         </bolt-tab-panel>`;

//       document.body.appendChild(tabs);
//       tabs.updated();

//       const child = tabs.querySelector('bolt-tab-panel');
//       child.updated();

//       return child.renderRoot.innerHTML;
//     });

//     const renderedShadowDomHTML = await html(defaultTabsShadowRoot);

//     await page.waitFor(500);
//     const image = await page.screenshot();

//     expect(image).toMatchImageSnapshot({
//       failureThreshold: '0.01',
//       failureThresholdType: 'percent',
//     });

//     // @todo: this just renders the <style> tag, same happens in button
//     // Is there any point in adding this snapshot?
//     // expect(renderedShadowDomHTML).toMatchSnapshot();
//   });

//   test('Default <bolt-tabs> w/o Shadow DOM renders', async function() {
//     const defaultTabsShadowRoot = await page.evaluate(() => {
//       const tabs = document.createElement('bolt-tabs');
//       tabs.innerHTML = `
//         <bolt-tab-panel>
//           <bolt-text slot="label">Tabs item 1</bolt-text>
//           <bolt-text>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</bolt-text>
//         </bolt-tab-panel>
//         <bolt-tab-panel>
//           <bolt-text slot="label">Tabs item 2</bolt-text>
//           <bolt-text>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</bolt-text>
//         </bolt-tab-panel>
//         <bolt-tab-panel>
//           <bolt-text slot="label">Tabs item 3</bolt-text>
//           <bolt-text>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</bolt-text>
//         </bolt-tab-panel>`;

//       document.body.appendChild(tabs);
//       tabs.useShadow = false;
//       tabs.updated();

//       const child = tabs.querySelector('bolt-tab-panel');
//       child.updated();

//       return child.renderRoot.innerHTML;
//     });

//     const renderedShadowDomHTML = await html(defaultTabsShadowRoot);

//     await page.waitFor(500);
//     const image = await page.screenshot();

//     expect(image).toMatchImageSnapshot({
//       failureThreshold: '0.01',
//       failureThresholdType: 'percent',
//     });

//     expect(renderedShadowDomHTML).toMatchSnapshot();
//   });
// });
