import {
  render,
  renderString,
  stopServer,
  html,
  vrtDefaultConfig as vrtConfig,
  $RefParser,
} from '../../../testing/testing-helpers';
const { join } = require('path');
const schemaFilePath = join(__dirname, '../tabs.schema.yml');

const timeout = 120000;

describe('<bolt-tabs> Component', () => {
  let page, schema, props;

  beforeEach(async () => {
    await page.evaluate(() => {
      document.body.innerHTML = '';
    });
  }, timeout);

  beforeAll(async () => {
    schema = await $RefParser.dereference(schemaFilePath);
    props = schema.properties;
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

  // todo: why isn't this working?
  // $RefParser.dereference(schemaFilePath, (err, schema) => {
  //   schema.properties.spacing.enum.forEach(async spacingChoice => {
  //     test(`spacing: ${spacingChoice}`, async () => {
  //       const results = await render('@bolt-components-tabs/tabs.twig', {
  //         spacing: spacingChoice,
  //         panels: [
  //           {
  //             label: 'Tab label 1',
  //             content: 'This is the tab content.',
  //           },
  //           {
  //             label: 'Tab label 2',
  //             content: 'This is the tab content.',
  //           },
  //           {
  //             label: 'Tab label 3',
  //             content: 'This is the tab content.',
  //           },
  //         ],
  //       });
  //       expect(results.ok).toBe(true);
  //       expect(results.html).toMatchSnapshot();
  //     });
  //   });
  // });
});
